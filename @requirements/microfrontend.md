Menggunakan **React Vite** dengan **Module Federation** di dalam **Monorepo** memerlukan plugin khusus karena Vite secara asli menggunakan ESM, sedangkan Module Federation awalnya lahir di ekosistem Webpack. Kita akan menggunakan plugin `@originjs/vite-plugin-federation`.

Berikut adalah panduan implementasi yang *clean*, *scalable*, dan siap untuk Docker.

---

## 1. Struktur Monorepo (pnpm)

Pastikan `pnpm-workspace.yaml` Anda sudah mencakup folder apps:

```yaml
packages:
  - 'apps/*'

```

---

## 2. Setup Remote (`apps/remote`)

Aplikasi ini akan mengekspor fitur yang akan dikonsumsi.

**vite.config.ts (Remote):**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      // Ekspos komponen yang ingin dibagikan
      exposes: {
        './Button': './src/components/Button.tsx',
        './UserCard': './src/features/UserCard.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});

```

---

## 3. Setup Host (`apps/host`)

Aplikasi utama yang mengonsumsi fitur dari remote.

**vite.config.ts (Host):**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host_app',
      remotes: {
        // Gunakan env variable untuk URL remote agar fleksibel (Dev vs Prod)
        remote_app: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});

```

---

## 4. Implementasi Kode (Clean Code)

Untuk menghindari error saat runtime jika remote mati, gunakan **Dynamic Import** dengan `React.lazy`.

**apps/host/src/App.tsx:**

```tsx
import React, { Suspense } from 'react';

// @ts-ignore
const RemoteButton = React.lazy(() => import('remote_app/Button'));

function App() {
  return (
    <div className="container">
      <h1>Main Host Application</h1>
      
      <ErrorBoundary fallback={<div>Remote Component is Unavailable</div>}>
        <Suspense fallback={<div>Loading Remote Button...</div>}>
          <RemoteButton label="Click Me From Host" />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

```

> **Note:** Karena TypeScript tidak tahu tentang module `remote_app`, buatlah file `apps/host/src/remotes.d.ts` berisi `declare module "remote_app/*";`.

---

## 5. Dockerization (Multi-stage Build)

Karena MFE bergantung pada file statis, kita akan menggunakan **Nginx** untuk melayani build production.

**apps/host/Dockerfile:**

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm & dependensi
RUN npm install -g pnpm
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/host/package.json ./apps/host/
COPY apps/remote/package.json ./apps/remote/
RUN pnpm install --frozen-lockfile

# Copy source dan build
COPY . .
RUN pnpm --filter host build

# Stage 2: Serve dengan Nginx
FROM nginx:alpine
# Copy hasil build ke folder Nginx
COPY --from=builder /app/apps/host/dist /usr/share/nginx/html

# Tambahkan konfigurasi Nginx untuk mendukung SPA routing
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

```

---

## Strategi Deployment

Agar sistem ini berjalan mulus di Docker/Production:

1. **Fixed Ports:** Pastikan di Docker Compose atau Kubernetes, aplikasi `remote` selalu bisa diakses di URL yang didaftarkan pada `host` (misal: `http://remote-service:5001`).
2. **Versioning:** Gunakan tag Docker yang sama untuk `host` dan `remote` guna memastikan kompatibilitas fitur.

**Apakah Anda ingin saya buatkan file `docker-compose.yaml` untuk menjalankan kedua aplikasi ini (Host & Remote) secara bersamaan?**
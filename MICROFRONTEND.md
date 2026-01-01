# Microfrontend Architecture with Clean Architecture & Atomic Design

This monorepo implements a **scalable microfrontend architecture** using **React + Vite + Module Federation**, structured with **Clean Architecture** principles and **Atomic Design**.

## 🏗️ Architecture Stack

- **Core**: React 18, Vite 5, TypeScript
- **State Management**: Zustand (Persisted)
- **Styling**: Tailwind CSS (Dark Mode support)
- **Networking**: Axios (with Interceptors)
- **Microfrontend**: `@originjs/vite-plugin-federation`
- **Pattern**: Clean Architecture (Uncle Bob) + Atomic Design

## 🧩 System Components

### 1. Host Application (`apps/host`) - "Web App"
The main container application.
- **Port:** `3000`
- **Responsibility:** Composition, Routing, Authentication, State Management.
- **Clean Architecture Layers:**
  - `core/domain`: Entities (`User`) & Interfaces (`IAuthRepository`).
  - `core/usecases`: Business logic (`AuthLoginUseCase`).
  - `core/infrastructure`: API implementation (`RealAuthRepository`, `MockAuthRepository`, `ApiClient`).
  - `presentation`: UI Components (`LoginForm`), Pages (`LoginPage`), Stores (`authStore`).

### 2. Remote Application (`apps/remote`) - "Atomic UI Lib"
The component library provider.
- **Port:** `3001` (Dev) / `5001` (Preview)
- **Responsibility:** Providing reusable, atomic UI components.
- **Atomic Design Structure:**
  - `atoms`: `Button`, `Input`, `Label`
  - `molecules`: `FormField`, `ThemeToggle`

---

## 🚀 How to Run

### Development Mode (with Mock API)
Ideal for frontend development layout and logic without backend dependencies.

1.  **Start Remote App (Terminal 1)**
    *First, build and preview the remote app so the host can consume it.*
    ```bash
    pnpm --filter remote-app build
    pnpm --filter remote-app preview
    # Runs on http://localhost:5001
    ```

2.  **Start Host App (Terminal 2)**
    ```bash
    # Ensure .env.development has VITE_USE_MOCK=true
    pnpm --filter web-app dev
    # Runs on http://localhost:3000
    ```

    **Mock Credentials:**
    - Admin: `admin@example.com` / `admin123`
    - User: `user@example.com` / `user123`

### Production Mode (with Real API)
Connects to actual backend services.

1.  **Configure Environment**
    Update `apps/host/.env.production` (or `.env.development` if testing locally):
    ```env
    VITE_USE_MOCK=false
    VITE_API_URL=https://your-api.com/v1
    ```

2.  **Run Applications**
    Follow the same steps as above. The `registry.ts` will automatically switch to `RealAuthRepository`.

---

## 🛠️ Key Features Implementation

### Clean Architecture & Dependency Injection
Dependencies flow inwards. The `registry.ts` acts as the composition root, injecting either `MockAuthRepository` or `RealAuthRepository` into the Use Cases based on environment variables.

### Axios & Interceptors
We replaced `fetch` with a robust `ApiClient` wrapper around **Axios**.
- **Request Interceptor**: Adds logic for Auth tokens (ready for expansion).
- **Response Interceptor**: Handles global errors (401 Unauthorized, 500 Server Error) centrally.

### Module Federation
Components are loaded dynamically using `React.lazy` and `Suspense`.
- **Host Config**: Consumes `remote_app` from `VITE_REMOTE_URL`.
- **Remote Config**: Exposes components like `./atoms/Button`, `./molecules/FormField`.

---

## 🐳 Docker Deployment

Build and orchestrate everything with Docker Compose.

```bash
# Build and start services
docker-compose up --build

# Stop services
docker-compose down
```

- **Host App**: http://localhost:3000
- **Remote App**: http://localhost:5001

---

## 📝 Troubleshooting

**1. "Failed to fetch dynamically imported module"**
- Ensure the **Remote App** is running on port **5001** (Preview mode). The Host expects the built `remoteEntry.js` artifact.
- Run `pnpm --filter remote-app build && pnpm --filter remote-app preview`.

**2. "Sign In" button not working**
- Ensure you are using the latest build of `remote-app` where `Button` component accepts `type="submit"`.

**3. TypeScript Errors**
- Check `apps/host/src/remotes.d.ts` if you added new components to the remote app.

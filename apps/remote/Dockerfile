# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/remote/package.json ./apps/remote/
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/remote ./apps/remote
COPY shared ./shared

# Build the remote app
RUN pnpm --filter remote-app build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/apps/remote/dist /usr/share/nginx/html

# Configure Nginx for SPA routing
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
        \
        # CORS headers for Module Federation \
        add_header Access-Control-Allow-Origin *; \
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS"; \
        add_header Access-Control-Allow-Headers "Content-Type"; \
    } \
    \
    # Specific handling for remoteEntry.js \
    location /assets/remoteEntry.js { \
        root /usr/share/nginx/html; \
        add_header Access-Control-Allow-Origin *; \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Monorepo with Turborepo

This is a monorepo example using Turborepo, React, Vite, and Tailwind CSS v3.

## What's inside?

This monorepo uses [Turborepo](https://turbo.build/) and contains:

### Apps and Packages

- `apps/web`: A web application using React + Vite (runs on port 3000)
- `apps/mobile`: A mobile application using React + Vite (runs on port 3001)
- `shared/ui`: A shared UI component library with Tailwind CSS

### Utilities

This Turborepo has some additional tools:

- **TypeScript** for static type checking
- **ESLint** for code linting
- **Prettier** for code formatting

## Quick Start

To install dependencies and run all apps:

```bash
# Install dependencies
pnpm install

# Run all apps in development mode
pnpm dev
```

The apps will be available at:
- Web App: http://localhost:3000
- Mobile App: http://localhost:3001

## Commands

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean all build outputs

## Development

### Adding a new app

1. Create a new folder in `apps/`
2. Initialize it with Vite React + TypeScript
3. Update the new app's `package.json` to include `@monorepo/ui` dependency

### Adding a new shared component

1. Add your component to `shared/ui/src/components/`
2. Export it from `shared/ui/src/index.ts`
3. Use it in any app by importing from `@monorepo/ui`

## Micro Frontend Ready

This monorepo is set up for micro frontend architecture with:

- Independent deployment capability for each app
- Shared component library for consistency
- Separate build outputs for each application
- Scalable structure for adding more applications

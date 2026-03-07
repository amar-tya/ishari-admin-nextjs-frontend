# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Development server (uses webpack)
bun build        # Production build (uses webpack)
bun start        # Start production server
bun lint         # ESLint
bun format       # Prettier write
bun test         # Run tests (vitest)
bun test:watch   # Run tests in watch mode
```

All commands use **bun** as the package manager and runtime.

## Environment

Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_API_BASE_URL` — backend API base URL
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key

## Architecture

This is a **Clean Architecture** Next.js 16 admin panel. The layers have strict dependency rules: **Core ← Application ← Infrastructure**, and **Presentation** depends on Application via DI.

### Layer Overview

```
src/
├── app/                  # Next.js App Router (pages only, no business logic)
│   ├── (auth)/           # Protected admin routes (dashboard, books, chapters, etc.)
│   ├── (guest)/          # Unauthenticated routes (login)
│   └── (public)/         # Public routes (muhud, diba, kitab)
├── core/                 # Domain layer — no external dependencies
│   ├── entities/         # Domain entities (camelCase fields)
│   ├── errors/           # AppError and subclasses
│   └── types/            # Result<T>, ApiResponse, shared types
├── application/          # Use cases & port interfaces
│   ├── usecases/         # One folder per feature, execute() returns Result<T>
│   ├── ports/repository/ # IXxxRepository interfaces
│   ├── ports/service/    # IXxxService interfaces
│   └── dto/              # Input DTOs (used as use case params, not entities)
├── infrastructure/       # External service implementations
│   ├── repositories/     # Supabase repository implementations
│   ├── services/         # AuthService, etc.
│   ├── mappers/          # snake_case API ↔ camelCase entity conversion
│   ├── models/           # API response types (snake_case)
│   └── supabase/         # Supabase browser/server clients
├── presentation/         # UI layer
│   ├── components/       # Reusable UI components
│   ├── hooks/            # useXxx hooks — call use cases from container
│   ├── view-models/      # Per-feature state management (one folder per feature)
│   └── stores/           # Global Zustand stores (e.g., useAudioPlayerStore)
├── di/
│   └── container.ts      # Wires all repositories, services, and use cases
└── shared/               # Cross-cutting utilities
```

### Data Flow

```
Page Component
    ↓
Hook (src/presentation/hooks/useXxx.ts)
    ↓
Use Case (src/application/usecases/xxx/)  ← imported from container
    ↓
Repository (src/infrastructure/repositories/)
    ↓
Supabase client
```

### Key Patterns

**Result type** — never throw; always return `Result<T>`:
```typescript
return success(data);   // { success: true, data }
return failure(error);  // { success: false, error }
```

**DI Container** (`src/di/container.ts`) — all use cases are instantiated here with injected repositories/services. Hooks import `container` from `@/di`.

**Naming**:
- Entity fields: `camelCase` (`publishedYear`, `createdAt`)
- API/model fields: `snake_case` (`published_year`, `created_at`)
- Mappers handle conversion between the two

**Supabase clients** — `src/infrastructure/supabase/client.ts` (browser), `server.ts` (server components). The middleware (`src/proxy.ts`) uses a server client for auth and role checking.

### Route Guards (middleware)

`middleware.ts` re-exports `proxy` from `src/proxy.ts`. The proxy:
- Redirects authenticated users away from `/login`, `/register`, `/forgot-password`
- Redirects unauthenticated users to `/login?redirect=...`
- Redirects `role === 'user'` away from admin routes to `/`
- Role is fetched from `public.users` table (not user_metadata)

### New Feature Checklist

1. `src/core/entities/{feature}.entity.ts`
2. `src/application/dto/{feature}.dto.ts`
3. `src/application/ports/repository/{feature}.repository.port.ts`
4. `src/application/usecases/{feature}/`
5. `src/infrastructure/models/{feature}.model.ts`
6. `src/infrastructure/mappers/{feature}.mapper.ts`
7. `src/infrastructure/repositories/{feature}.repository.ts`
8. `src/presentation/hooks/use{Feature}.ts`
9. Register in `src/di/container.ts`
10. Update `AGENTS.md` Project Map section

### Rules

- Never import infrastructure from core or application layers
- Never bypass use cases (hooks must go through container, not directly to repositories)
- Never use Entity as use case input — always use DTOs
- Never hardcode API response types in repositories — use `src/infrastructure/models/`

# Ishari Admin Next

Admin panel dengan **Next.js 16** dan **Clean Architecture**.

## Tech Stack

- Next.js 16.1.1 (App Router)
- TypeScript 5
- TailwindCSS 4
- Bun / Node.js

## Project Structure

```
src/
├── app/                      # Next.js pages & routes
├── application/              # Use cases & ports
│   ├── ports/
│   │   ├── repository/       # Repository interfaces
│   │   └── service/          # Service interfaces
│   ├── dto/                  # Data transfer objects
│   └── usecases/             # Business logic
├── core/                     # Domain layer
│   ├── entities/             # Domain entities
│   ├── errors/               # Custom errors
│   └── types/                # Shared types
├── infrastructure/           # External implementations
│   ├── http/                 # HTTP client
│   ├── repositories/         # Repository implementations
│   ├── services/             # Service implementations
│   └── mappers/              # Data mappers
├── presentation/             # UI layer
│   ├── components/
│   │   └── forms/            # Form components
│   ├── view-models/
│   │   └── login/            # Per-feature ViewModels
│   ├── hooks/                # Reusable hooks
│   └── stores/               # Global state
├── di/                       # Dependency injection
└── shared/                   # Shared utilities
```

## Architecture Flow

```
Component (LoginPage)
    ↓
ViewModel (useLoginViewModel)
    ↓
UseCase (LoginUseCase)
    ↓         ↓
Repository   Service
    ↓         ↓
 API        Cookies
```

## Getting Started

```bash
# Copy environment
cp .env.example .env

# Install dependencies
bun install

# Run development
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command     | Description              |
| ----------- | ------------------------ |
| `bun dev`   | Start development server |
| `bun build` | Build for production     |
| `bun start` | Start production server  |
| `bun lint`  | Run ESLint               |

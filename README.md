# Ishari Admin Next

Admin panel application built with **Next.js 16** using **Clean Architecture** pattern.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **Runtime**: Bun / Node.js

## Project Structure

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/proxy/          # API proxy to backend
│   └── (auth)/             # Auth-related pages
├── core/                   # Domain layer
│   ├── errors/             # Custom error classes
│   └── types/              # Shared types (Result pattern)
├── infrastructure/         # Infrastructure layer
│   ├── http/               # HTTP client abstraction
│   ├── repositories/       # Data repositories
│   └── services/           # External services
├── application/            # Use cases / application logic
├── presentation/           # UI components & hooks
├── di/                     # Dependency injection
└── shared/                 # Shared utilities
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Backend API server

### Environment Setup

Copy `.env.example` to `.env` and configure:

```env
NEXT_PUBLIC_API_BASE_URL=http://your-api-server.com
```

### Run Development Server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture

### Clean Architecture Layers

| Layer              | Folder            | Purpose                                      |
| ------------------ | ----------------- | -------------------------------------------- |
| **Core**           | `core/`           | Domain entities, errors, types               |
| **Infrastructure** | `infrastructure/` | External services, HTTP client, repositories |
| **Application**    | `application/`    | Use cases, business logic                    |
| **Presentation**   | `presentation/`   | React components, hooks                      |

### Error Handling

Global error classes available:

```typescript
import {
  NetworkError,
  UnauthorizedError,
  ValidationError,
  NotFoundError,
  ServerError,
} from "@/core/errors";
```

### HTTP Client Usage

```typescript
import { createHttpClient } from "@/infrastructure/http";

const http = createHttpClient();
const result = await http.get<User[]>("/api/proxy/users");

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

## Scripts

| Command     | Description              |
| ----------- | ------------------------ |
| `bun dev`   | Start development server |
| `bun build` | Build for production     |
| `bun start` | Start production server  |
| `bun lint`  | Run ESLint               |

## License

Private - All rights reserved.

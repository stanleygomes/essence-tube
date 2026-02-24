---
applyTo: '**'
---

## Project Overview

**EssenceTube** is a minimalist YouTube client that removes algorithmic recommendations and distractions. Users see only videos from channels they explicitly follow — no feed algorithms, no suggested videos. It's a clean, intentional alternative to YouTube's recommendation-driven experience.

### Technology Stack

- **Language**: TypeScript 5.9.2
- **Monorepo**: Turborepo 2.8
- **Package Manager**: npm 10.9.3
- **Runtime**: Node.js 22+
- **Backend (API)**: Express 5.1 / Fastify 5.4
- **Frontend (UI)**: Next.js 16.1.6 (React 19) + TailwindCSS 4
- **Database**: MongoDB 6.17 (Mongoose 8.16)
- **Cache**: Redis 5.6
- **Authentication**: Google OAuth 2.0 + JWT
- **Linting**: ESLint 9
- **Formatting**: Prettier 3.7
- **Deployment**: Vercel

### Project Structure

```
essence-tube/
├── apps/
│   ├── api/                          # Backend API
│   │   └── src/
│   │       ├── domain/               # Core business logic (framework-agnostic)
│   │       │   ├── entities/         # Entity interfaces (user, video, channel, playlist, token)
│   │       │   ├── errors/           # Custom error classes
│   │       │   ├── factories/        # Object factories
│   │       │   ├── mappers/          # Entity transformation mappers
│   │       │   └── port/             # Repository & service interfaces
│   │       │       ├── auth/         # Auth service interfaces
│   │       │       ├── databases/    # Repository interfaces (user, token)
│   │       │       └── services/     # External service interfaces (partner media, oauth)
│   │       ├── application/          # Application layer
│   │       │   └── usecases/         # Use case classes (single execute() method)
│   │       └── infra/                # Infrastructure layer
│   │           ├── auth/             # Auth implementations
│   │           ├── config/           # Environment & config management
│   │           ├── database/         # MongoDB & Redis implementations
│   │           ├── logger/           # Pino logging
│   │           ├── providers/        # Dependency injection providers
│   │           ├── services/         # Google Auth, YouTube API clients
│   │           └── web/              # HTTP server layer
│   │               ├── fastify/      # Fastify routes & middleware
│   │               └── vercel/       # Vercel serverless functions
│   └── ui/                           # Frontend (Next.js)
│       └── src/
│           ├── app/                  # Next.js app router
│           ├── config/               # Frontend configuration
│           ├── models/               # Frontend data models
│           ├── modules/              # Feature modules (feed, video, settings, login, etc.)
│           ├── services/             # API clients, utilities
│           ├── shared/               # Reusable components
│           └── style/                # Global styles
├── packages/                         # Shared packages
│   ├── eslint-config/                # Shared ESLint configuration
│   ├── typescript-config/            # Shared TypeScript configuration
│   └── ui/                           # Shared UI components
```

### Clean Architecture

The API follows Clean Architecture with dependencies always pointing inward:

- **Domain**: Framework-agnostic business logic, entity interfaces, port interfaces
- **Application**: Use cases that orchestrate domain logic
- **Infrastructure**: Concrete implementations (MongoDB, Redis, Express, Fastify, external APIs)

### Build and Development Commands

Root-level commands (orchestrated by Turborepo):
- `npm run build` - Build all apps
- `npm run dev` - Start all apps in development mode
- `npm run lint` - Lint all code (ESLint, max-warnings=0)
- `npm run lint:fix` - Auto-fix lint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run check-types` - Run TypeScript type checking

API-specific (`cd apps/api`):
- `npm run dev` - Start Vercel dev server (port 5000)
- `npm run dev:fastify` - Start Fastify dev server (port 5000)
- `npm run containers:up` - Start MongoDB & Redis via Docker Compose
- `npm run containers:down` - Stop containers

UI-specific (`cd apps/ui`):
- `npm run dev` - Start Next.js dev server (port 3000)
- `npm run build` - Build Next.js production bundle

### CI/CD Pipeline

- **Pull Request**: Conventional commits check, dependency review, lint, format check, type check, audit, CodeQL analysis, build
- **Release**: On push to `master`, runs checks and build, then creates a release via `release-please-action` with semantic versioning and auto-generated CHANGELOG
- **Deployment**: Vercel (automatic deploys from `master`)

## Code Rules

### Clean Code
- Write extremely concise and objective code
- Never put comments in the code — prefer clear names and method/class extraction

### SOLID Principles
- Total priority for Single Responsibility (SRP) and Open/Closed (OCP)
- Separate responsibilities into reusable classes

### Project-Specific Rules

**Language**:
- Code must be written in English
- All text strings and UI labels must be in English

**Architecture**:
- Follow Clean Architecture layers: Domain → Application → Infrastructure
- Domain layer must be framework-agnostic (no Express, Fastify, MongoDB imports)
- Use port interfaces in `domain/port/` for dependency inversion
- Implement concrete classes in `infra/` layer

**Entities**:
- Define as TypeScript interfaces in `domain/entities/`
- Properties use `snake_case` naming (e.g., `partner_id`, `created_at`)
- Optional timestamps with `?`

**Use Cases**:
- Place in `application/usecases/`
- Class-based with constructor dependency injection
- Single `execute()` method as entry point
- File naming: `kebab-case.ts` (e.g., `save-user-use-case.ts`)

**Mappers**:
- Place in `domain/mappers/`
- Use static class methods for entity transformation
- Name pattern: `[Source]To[Target]Mapper` (e.g., `AuthInfoToUserMapper`)

**Repositories**:
- Define interfaces in `domain/port/databases/`
- Implement concrete classes in `infra/database/`
- Use generic base repository pattern (e.g., `MongoRepository`)

**Routes**:
- Class-based route handlers with arrow function methods
- Error handling with try-catch and custom `BusinessError`
- Logging via centralized `Logger`

**UI Modules**:
- Place feature pages in `apps/ui/src/modules/[feature]/`
- Each module contains a `page.tsx`
- Use shared components from `apps/ui/src/shared/`

**Shared Packages**:
- ESLint config: `packages/eslint-config/`
- TypeScript config: `packages/typescript-config/`
- Shared UI components: `packages/ui/`

### Development Workflow

1. Make code changes following the coding rules
2. Run `npm run format` to ensure code style
3. Run `npm run lint` to validate code style
4. Run `npm run check-types` to verify TypeScript types
5. Run `npm run build` to build the project

## Test Rules

### Test Pattern
- **AAA Pattern**: Arrange → Act → Assert
- **Title Convention**: Use the pattern `"should [behavior] when [condition]"`
- **Test Type**: Only unit tests

### Test Structure
- Package structure must match the tested class
- Test file naming: `[file-name].test.ts`
- Keep tests short and focused

### Test Coverage
- Create 1 test for the ideal scenario (Happy Path)
- Create 1 test for each alternative/error branch
- Tests must be independent — do not share state

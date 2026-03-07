---
applyTo: "**"
---

## Project Overview

**EssenceTube** is a minimalist YouTube client that removes algorithmic recommendations and distractions. Users see only videos from channels they explicitly follow — no feed algorithms, no suggested videos. It's a clean, intentional alternative to YouTube's recommendation-driven experience.

### Technology Stack

- **Language**: TypeScript 5.9.2
- **Monorepo**: Turborepo 2.8
- **Runtime**: Node.js 22+
- **Backend (API)**: Express 5.1 / Fastify 5.4
- **Frontend (UI)**: Next.js 16.1.6 (React 19) + TailwindCSS 4
- **Linting**: ESLint 9
- **Formatting**: Prettier 3.7

#### Apps-Specific Technologies

- **apps/ui**: Standard Next.js with TailwindCSS 4
- **apps/paul-ui**: Next.js with TailwindCSS 4, Hero UI components, @iconify/react icons
- **apps/api**: Fastify/Express with MongoDB & Redis

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
│   ├── ui/                           # Frontend (Next.js)
│   │   └── src/
│   │       ├── app/                  # Next.js app router
│   │       ├── config/               # Frontend configuration
│   │       ├── models/               # Frontend data models
│   │       ├── modules/              # Feature modules (feed, video, settings, login, etc.)
│   │       ├── services/             # API clients, utilities
│   │       ├── shared/               # Reusable components
│   │       └── style/                # Global styles
│   └── paul-ui/                      # Alternative Frontend (Next.js with Hero UI)
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
│   ├── ui/                           # Shared UI components
│   └── utils/                        # Shared utilities (e.g., date formatting)
```

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

**Shared Packages**:

- ESLint config: `packages/eslint-config/`
- TypeScript config: `packages/typescript-config/`
- Shared UI components: `packages/ui/`
- Shared utilities: `packages/utils/` (e.g., date formatting)

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

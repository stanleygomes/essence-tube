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
├── packages/                         # Shared packages
│   ├── eslint-config/                # Shared ESLint configuration
│   ├── typescript-config/            # Shared TypeScript configuration
│   ├── ui/                           # Shared UI components
│   └── utils/                        # Shared utilities (e.g., date formatting)
```

## Global Code Rules

- Write concise, objective code — no inline comments; use clear names and method extraction instead.
- Apply **SRP** and **OCP** (SOLID): each class has one responsibility; extend via new classes, not by modifying existing ones.
- All code, identifiers, and UI labels must be in **English**.
- Prefer existing shared packages (`@essence-tube/*`) over duplicating logic across apps.

## Skills available

Detailed, task-specific guidance lives in `.github/skills/`. The agent loads a skill when the task matches its keywords.

| Skill                     | Path                                            | When to use                                           |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| **testing**               | `.github/skills/testing/SKILL.md`               | Writing or reviewing unit tests                       |
| **observability**         | `.github/skills/observability/SKILL.md`         | Adding or reviewing log statements                    |
| **code-style**            | `.github/skills/code-style/SKILL.md`            | Lint, format, or style questions                      |
| **monorepo-architecture** | `.github/skills/monorepo-architecture/SKILL.md` | Workspace layout, package boundaries, Turborepo tasks |

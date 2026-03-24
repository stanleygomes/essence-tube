---
name: monorepo-architecture
description: Workspace layout, app boundaries, and dependency rules for the EssenceTube Turborepo monorepo.
---

## When to apply

Apply this skill whenever you are asked to:
- Add a new app or package to the monorepo
- Move code between workspaces
- Decide where a piece of logic should live
- Configure Turborepo tasks or workspace dependencies
- Review cross-package imports

Keywords: `monorepo`, `turborepo`, `workspace`, `package`, `boundary`, `dependency`, `apps`, `packages`

## Workspace layout

```
essence-tube/
├── apps/
│   ├── api/          # Backend API — Fastify/Express, MongoDB, Redis
│   ├── auth-api/     # Auth service — Fastify, SQLite/Drizzle, Resend, RS256 JWT
│   ├── revelation/   # AI-powered service — Fastify, Google AI Studio
│   ├── ui/           # Primary frontend — Next.js 16, React 19, TailwindCSS 4
│   └── paul-ui/      # Alternative frontend — Next.js 16, Hero UI
├── packages/
│   ├── eslint-config/      # @logos/eslint-config — shared ESLint rules
│   ├── typescript-config/  # @logos/typescript-config — shared tsconfig bases
│   ├── ui/                 # @logos/ui — shared React components
│   ├── utils/              # @logos/utils — date formatting and other utilities
│   ├── logger/             # @logos/logger — Pino wrapper
│   ├── jwt/                # @logos/jwt — RS256 JWT signing/verification
│   ├── email/              # @logos/email — email sending abstraction
│   └── http/               # @logos/http — HTTP client abstraction
```

## Dependency rules

- **`apps/*`** may depend on **`packages/*`** — never the other way around.
- **`packages/*`** must not depend on **`apps/*`**.
- Cross-app dependencies are **not allowed** — shared logic must be extracted to a package.
- All shared packages are scoped under `@logos/*`.

## Internal app architecture (for `apps/api` and `apps/auth-api`)

Each backend app follows a layered architecture:

```
src/
├── domain/        # Pure business logic — entities, errors, ports (interfaces), factories, mappers
├── application/   # Use cases (each exposes a single execute() method)
└── infra/         # Framework-specific — routes, DB clients, external services, DI providers
```

Dependency direction: `infra` → `application` → `domain` (never reversed).

## Turborepo task pipeline

Defined in `turbo.json`:

| Task | Dependencies | Notes |
|------|-------------|-------|
| `build` | `^build` (dependencies first) | Outputs: `.next/**` |
| `lint` | `^lint` | |
| `check-types` | `^check-types` | |
| `dev` | — | Persistent, no cache |

## Commands

```bash
# Run all apps in dev mode
npm run dev

# Run a single app
npm run app:auth       # auth-api
npm run app:revelation # revelation
npm run app:paul       # paul-ui
npm run ui             # ui

# Build everything
npm run build

# Run Turborepo for a specific workspace
npx turbo run build --filter=api
npx turbo run lint --filter=auth-api
```

## Adding a new shared package

1. Create `packages/<name>/` with `package.json` naming it `@logos/<name>`.
2. Add `"@logos/<name>": "file:../packages/<name>"` to the consuming app's `package.json`.
3. Export from `packages/<name>/src/index.ts`.
4. Reference the shared `packages/typescript-config/` in the package's `tsconfig.json`.

## Checklist

- [ ] New code placed in the correct layer (`domain` / `application` / `infra`)
- [ ] Shared logic lives in `packages/` not duplicated across apps
- [ ] No `apps/*` → `apps/*` imports
- [ ] New package uses `@logos/<name>` scope and a `src/index.ts` entry point
- [ ] `turbo.json` updated if a new task is introduced

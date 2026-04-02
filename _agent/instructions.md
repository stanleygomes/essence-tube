---
applyTo: "**"
---

## Project Overview

**EssenceTube** is a minimalist YouTube client that removes algorithmic recommendations and distractions. Users see only videos from channels they explicitly follow — no feed algorithms, no suggested videos. It's a clean, intentional alternative to YouTube's recommendation-driven experience.

### Technology Stack

- **Language**: TypeScript 5.9.2
- **Monorepo**: Turborepo 2.8
- **Runtime**: Node.js 24+
- **Backend**: Fastify 5.4 / Express 5.1 (Auth API)
- **Frontend**: Next.js 16.1.6 (React 19) + TailwindCSS 4
- **ORM**: Drizzle ORM (PostgreSQL for Auth, LibSQL/SQLite for Core AI)
- **Linting**: ESLint 9
- **Formatting**: Prettier 3.7
- **UI Design**: [Neobrutalism](https://www.neobrutalism.dev) (High contrast, bold borders, hard shadows)

### Project Structure

```
essence-tube/
├── apps/
│   ├── api/                     # API service (Fastify + Google AI Studio)
│   └── ui/                       # Primary Next.js web interface
├── packages/
│   ├── eslint-config/                # Shared ESLint configuration
│   ├── typescript-config/            # Shared TypeScript configuration
│   └── ui/                           # Shared Neobrutalism UI components (@packages/ui)
```

## Global Code Rules

- Write concise, objective code — no inline comments; use clear names and method extraction instead.
- Apply **SRP** and **OCP** (SOLID): each class has one responsibility; extend via new classes, not by modifying existing ones.
- All code, identifiers, and UI labels must be in **English**.
- All UI development must follow the **Neobrutalism** design system ([neobrutalism.dev](https://www.neobrutalism.dev)).
- Shared UI components are managed centrally in [`packages/ui`](file:///media/stan_silva/Partition_3/projects/_personal/paul/packages/ui) (`@packages/ui`). Use Shadcn with Neobrutalism variants.
- Prefer existing shared packages (`@packages/*`) over duplicating logic across apps.

## Skills available

Detailed, task-specific guidance lives in `_agent/skills/`. The agent loads a skill when the task matches its keywords.

| Skill                     | Path                                           | When to use                                           |
| ------------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| **testing**               | `_agent/skills/testing/SKILL.md`               | Writing or reviewing unit tests                       |
| **observability**         | `_agent/skills/observability/SKILL.md`         | Adding or reviewing log statements                    |
| **code-style**            | `_agent/skills/code-style/SKILL.md`            | Lint, format, or style questions                      |
| **monorepo-architecture** | `_agent/skills/monorepo-architecture/SKILL.md` | Workspace layout, package boundaries, Turborepo tasks |
| **frontend-ui**           | `_agent/skills/frontend-ui/SKILL.md`           | Building or refactoring Next.js/React UI code         |

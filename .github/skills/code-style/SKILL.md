---
name: code-style
description: Formatting, linting, and coding conventions for this TypeScript monorepo.
---

## When to apply

Apply this skill whenever you are asked to:

- Fix lint or formatting errors
- Review or enforce code style
- Set up a new file or module
- Apply Clean Code or SOLID principles

Keywords: `lint`, `format`, `eslint`, `prettier`, `style`, `convention`, `clean code`, `SOLID`, `naming`

## Tooling

| Tool             | Config location                                                | Purpose                                         |
| ---------------- | -------------------------------------------------------------- | ----------------------------------------------- |
| ESLint 9         | `packages/eslint-config/`                                      | Linting rules (shared across all apps/packages) |
| Prettier 3.7     | root `.prettierignore` + `prettier` key in root `package.json` | Formatting                                      |
| TypeScript 5.9.2 | `packages/typescript-config/`                                  | Shared TS compiler options                      |
| Husky            | `.husky/`                                                      | Git hooks (runs checks pre-commit)              |

## Commands

```bash
# Lint all workspaces
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Check formatting
npm run format:check

# Auto-format
npm run format

# Type-check all workspaces
npm run check-types

# Run all checks at once
npm run check

# Fix all auto-fixable issues at once
npm run fix

# Lint a single workspace (example: auth-api)
npm run -w auth-api lint
npm run -w auth-api check-types
```

## Code conventions

### Clean Code

- Write **concise and objective** code — prefer brevity without sacrificing clarity.
- **No comments** in the code — use clear names and extract methods/classes instead.

### SOLID

- **Single Responsibility (SRP)**: each class/function has one reason to change.
- **Open/Closed (OCP)**: extend behaviour via new classes/interfaces, not by modifying existing ones.
- Extract reusable logic into dedicated classes or shared packages.

### Language & naming

- All code and identifiers must be written in **English**.
- All UI labels and string literals visible to the user must be in **English**.
- Use `camelCase` for variables/functions, `PascalCase` for classes/interfaces/types.

## Checklist

- [ ] No inline comments (use self-documenting names instead)
- [ ] Each class/function has a single, clear responsibility
- [ ] `npm run check` passes with no errors
- [ ] New shared logic extracted to `packages/` (not duplicated across apps)
- [ ] All identifiers and strings are in English

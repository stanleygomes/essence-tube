---
name: observability
description: Logging conventions using Pino and @essence-tube/logger for all apps in this monorepo.
---

## When to apply

Apply this skill whenever you are asked to:

- Add, change, or review log statements
- Instrument a new service, use-case, or route
- Configure log levels or transports
- Troubleshoot missing or noisy logs

Keywords: `log`, `logger`, `logging`, `pino`, `observability`, `tracing`, `metrics`, `alerting`

## Stack

| App               | Logger                                                |
| ----------------- | ----------------------------------------------------- |
| `apps/api`        | `pino` + `pino-pretty` (direct)                       |
| `apps/auth-api`   | `@essence-tube/logger` (shared package wrapping Pino) |
| `apps/revelation` | `@essence-tube/logger` (shared package wrapping Pino) |

The `@essence-tube/logger` package lives at `packages/logger/` and re-exports a configured Pino instance.

## Environment variables

| Variable        | Purpose                                                             |
| --------------- | ------------------------------------------------------------------- |
| `LOG_LEVEL`     | Pino log level (`trace`, `debug`, `info`, `warn`, `error`, `fatal`) |
| `LOG_TRANSPORT` | Set to `pretty` for local dev; leave unset for JSON in production   |

## Conventions

- Always obtain the logger from the shared package or the already-configured instance — never create a new Pino instance inline.
- Use structured logging: pass a context object as the first argument, message string second.
- Choose the appropriate level:
  - `logger.info` — normal operational events (request received, resource created).
  - `logger.warn` — recoverable unexpected states.
  - `logger.error` — caught exceptions / failures that need attention.
  - `logger.debug` — verbose developer details (disabled in production).
- Never log sensitive data (passwords, tokens, PII).
- Log at the **infrastructure boundary** (route handlers, repository calls) — not inside pure domain logic.

## Checklist

- [ ] Logger imported from `@essence-tube/logger` (or the app's configured Pino instance)
- [ ] Structured context object included with every log call
- [ ] Log level is appropriate for the event
- [ ] No sensitive fields logged
- [ ] `LOG_LEVEL` / `LOG_TRANSPORT` env vars documented in the app's `.env.example`

## Example

```typescript
// apps/auth-api — using @essence-tube/logger
import { logger } from "@essence-tube/logger";

export class SendEmailCodeService {
  async execute(email: string): Promise<void> {
    logger.info({ email }, "Sending OTP code");
    try {
      await this.mailer.send(email);
      logger.info({ email }, "OTP code sent successfully");
    } catch (err) {
      logger.error({ email, err }, "Failed to send OTP code");
      throw err;
    }
  }
}
```

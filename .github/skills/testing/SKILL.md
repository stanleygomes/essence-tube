---
name: testing
description: Rules and conventions for writing unit tests in this repository.
---

## When to apply

Apply this skill whenever you are asked to:
- Write, add, or update tests
- Fix a failing test
- Review test coverage for a class or module

Keywords: `test`, `unit test`, `spec`, `coverage`, `vitest`, `jest`, `AAA`

## Conventions

### Pattern
- Use the **AAA (Arrange → Act → Assert)** structure in every test.
- Title convention: `"should [behavior] when [condition]"`

### File layout
- Mirror the source directory structure inside the same package.
- Name test files as `[file-name].test.ts` next to (or in a parallel tree to) the source file.

### Coverage rules
- 1 test for the **happy path** (ideal scenario).
- 1 test per **alternative / error branch**.
- Tests must be **independent** — no shared mutable state between tests.
- Only **unit tests** — no integration or E2E tests.

## Checklist

- [ ] File named `[file-name].test.ts`
- [ ] Each test follows AAA layout
- [ ] Test title matches `"should ... when ..."` pattern
- [ ] Happy-path test exists
- [ ] Each error/alternative branch has its own test
- [ ] No shared state between tests (`beforeEach` resets mocks/instances if used)

## Example

```typescript
// src/application/usecases/get-video.usecase.test.ts

describe('GetVideoUseCase', () => {
  it('should return video when id is valid', async () => {
    // Arrange
    const repo = { findById: vi.fn().mockResolvedValue({ id: '1', title: 'Test' }) };
    const useCase = new GetVideoUseCase(repo);

    // Act
    const result = await useCase.execute('1');

    // Assert
    expect(result).toEqual({ id: '1', title: 'Test' });
  });

  it('should throw NotFoundError when video does not exist', async () => {
    // Arrange
    const repo = { findById: vi.fn().mockResolvedValue(null) };
    const useCase = new GetVideoUseCase(repo);

    // Act & Assert
    await expect(useCase.execute('missing')).rejects.toThrow(NotFoundError);
  });
});
```

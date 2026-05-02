# Skill Registry — gpmf-website

**Generated**: 2026-05-02 (sdd-init)  
**Backend**: engram (default)

## Project Standards (Compact Rules)

### Next.js Migration Context
- Read `AGENTS.md` — "This is NOT the Next.js you know. APIs, conventions, file structure may differ from training data."
- Consult `node_modules/next/dist/docs/` before writing code in Next.js paths
- Heed deprecation notices; Next.js 16.2.4 has breaking changes from earlier versions

### Code Quality
- **Linter**: ESLint (eslint v9)
- **Type Check**: TypeScript strict mode (`tsc --noEmit`)
- **No Formatter Configured**: Consider adding Prettier if multi-contributor

### User Conventions (from ~/.claude/CLAUDE.md)
- Never add "Co-Authored-By" to commits — conventional commits only
- Default to short answers; start with minimum useful response
- Ask one question at a time, then STOP
- Verify technical claims before stating them
- Match user's language and use natural Rioplatense Spanish (voseo) in Spanish conversations
- Push back when user asks for code without understanding fundamentals

### Type System
- TypeScript `strict: true` enforced
- Path alias: `@/*` → project root
- React JSX mode enabled

## Available Skills

### Global Skills (User-Level)

- **SDD Skills**: sdd-init, sdd-explore, sdd-propose, sdd-spec, sdd-design, sdd-tasks, sdd-apply, sdd-verify, sdd-archive
- **Utility**: caveman (ultra-compressed communication), caveman-commit, caveman-review, caveman-help
- **Code Review**: review, judgment-day (adversarial review)
- **Persistence**: engram/memory (persistent session context)
- **Config**: update-config, keybindings-help

### Project-Level Skills
None. Use global skill registry.

## Testing Status

**⚠️ WARNING: No test runner detected**

| Capability | Status |
|-----------|--------|
| Unit Tests | ❌ Not configured |
| Integration Tests | ❌ Not configured |
| E2E Tests | ❌ Not configured |
| Test Coverage | ❌ Not available |

**Strict TDD Mode**: Disabled (no test runner found)

**Action**: If TDD is desired, add vitest or jest to devDependencies and configure. Currently all changes must be validated manually.

## Project Files Referenced

- `AGENTS.md` — Next.js 16 breaking changes and deprecation notices
- `tsconfig.json` — TypeScript strict mode configuration
- `next.config.ts` — Next.js configuration
- `package.json` — Dependencies (Next.js 16.2.4, React 19.2.4, TypeScript 5)

---

**Last Updated**: 2026-05-02 via sdd-init  
**Next**: Ready for /sdd-explore, /sdd-new, or /sdd-propose

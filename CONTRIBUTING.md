# Contributing to BrutalUI

Thanks for your interest in contributing! BrutalUI is a copy/paste component library built on shadcn/ui.

## Ways to contribute

- Fix bugs and visual regressions
- Add missing shadcn/ui components
- Improve docs and examples
- Improve accessibility

## Setup

```bash
npm install
```

## Local development

```bash
npm run dev
```

## Component updates

1) Add or update components under `src/components/ui`.
2) Add examples under `src/examples/ui`.
3) Add or update docs in `src/markdown/components`.
4) Update the registry:

```bash
npm run registry:generate
npm run registry:build
```

## Submit a PR

- Keep changes focused and scoped.
- Include screenshots for UI changes.
- Note any breaking changes.

Thanks again for helping improve BrutalUI.

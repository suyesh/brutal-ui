#!/usr/bin/env bash
set -euo pipefail

pnpm registry:generate
pnpm registry:build
pnpm build
vercel --prod

#!/usr/bin/env bash
set -euo pipefail

PREFIX="BrutalUi"

info() {
  printf "[%s] %s\n" "$PREFIX" "$*"
}

ok() {
  printf "[%s] %s\n" "$PREFIX" "$*"
}

warn() {
  printf "[%s] %s\n" "$PREFIX" "$*" >&2
}

die() {
  printf "[%s] %s\n" "$PREFIX" "$*" >&2
  exit 1
}

banner() {
  cat <<'BANNER'
 ___________________
|                   |
|        BU         |
|___________________|

BrutalUi Installer
BANNER
}

if [ ! -f package.json ]; then
  die "No package.json found. Run this from your project root."
fi

banner

PM=""
if [ -f pnpm-lock.yaml ]; then
  PM="pnpm"
elif [ -f yarn.lock ]; then
  PM="yarn"
elif [ -f bun.lockb ]; then
  PM="bun"
elif [ -f package-lock.json ]; then
  PM="npm"
else
  PM="npm"
fi

run_pm() {
  case "$PM" in
    pnpm) pnpm "$@" ;;
    yarn) yarn "$@" ;;
    bun) bun "$@" ;;
    npm) npm "$@" ;;
    *) die "Unknown package manager." ;;
  esac
}

run_exec() {
  case "$PM" in
    pnpm) pnpm dlx "$@" ;;
    yarn) yarn dlx "$@" ;;
    bun) bunx "$@" ;;
    npm) npx --yes "$@" ;;
    *) die "Unknown package manager." ;;
  esac
}

has_dep() {
  node -e "const p=require('./package.json');const d={...p.dependencies,...p.devDependencies};process.exit(d['$1']?0:1)"
}

get_dep_version() {
  node -e "const p=require('./package.json');const d={...p.dependencies,...p.devDependencies};process.stdout.write(d['$1']||'')"
}

get_dep_major() {
  node -e "const p=require('./package.json');const d={...p.dependencies,...p.devDependencies};const v=d['$1']||'';const m=(v.match(/\\d+/)||[''])[0];process.stdout.write(m)"
}

ensure_dep() {
  local dep="$1"
  if ! has_dep "$dep"; then
    info "Installing $dep"
    run_pm add -D "$dep"
    ok "$dep installed"
  else
    ok "$dep already installed"
  fi
}

detect_framework() {
  if has_dep "next"; then
    if [ -f src/app/layout.tsx ] || [ -f src/app/layout.jsx ] || [ -f app/layout.tsx ] || [ -f app/layout.jsx ]; then
      printf "next-app"
      return
    fi
    if [ -f src/pages/_app.tsx ] || [ -f src/pages/_app.jsx ] || [ -f pages/_app.tsx ] || [ -f pages/_app.jsx ]; then
      printf "next-pages"
      return
    fi
    printf "next"
    return
  fi

  if has_dep "vite" || [ -f vite.config.ts ] || [ -f vite.config.js ]; then
    printf "vite"
    return
  fi

  printf "unknown"
}

ensure_tailwind() {
  local tw_major
  tw_major="$(get_dep_major tailwindcss)"
  if [ -z "$tw_major" ] || [ "$tw_major" != "3" ]; then
    info "Installing tailwindcss@3.4.17 for shadcn/ui compatibility"
    run_pm add -D tailwindcss@3.4.17
    ok "tailwindcss@3.4.17 installed"
  else
    ok "tailwindcss already compatible (v3)"
  fi
  ensure_dep "postcss"
  ensure_dep "autoprefixer"
  ensure_dep "@tailwindcss/typography"
  ensure_dep "tw-animate-css"

  if ! ls tailwind.config.* >/dev/null 2>&1; then
    info "Initializing Tailwind config"
    if [ "$framework" = "next-app" ] || [ "$framework" = "next-pages" ] || [ "$framework" = "next" ]; then
      cat <<'CONFIG' > tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
CONFIG
    else
      cat <<'CONFIG' > tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
CONFIG
    fi
    ok "tailwind.config.js created"
  else
    ok "Tailwind config already exists"
  fi

  if [ ! -f postcss.config.js ] && [ ! -f postcss.config.cjs ]; then
    info "Initializing PostCSS config"
    cat <<'POSTCSS' > postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
POSTCSS
    ok "postcss.config.js created"
  else
    ok "PostCSS config already exists"
  fi
}

ensure_vite_alias() {
  if [ "$framework" != "vite" ]; then
    return
  fi

  local config_file="tsconfig.json"
  if [ ! -f "$config_file" ]; then
    info "Creating tsconfig.json with import alias"
    cat <<'JSON' > "$config_file"
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
JSON
    ok "tsconfig.json created"
    return
  fi

  info "Ensuring import alias in tsconfig.json"
  node -e "
    const fs = require('fs');
    const file = '$config_file';
    const raw = fs.readFileSync(file, 'utf8');
    const stripped = raw.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '').replace(/\\/\\/.*$/gm, '');
    let data = {};
    try {
      data = stripped.trim() ? JSON.parse(stripped) : {};
    } catch (e) {
      console.error('BrutalUi: Could not parse tsconfig.json; please add alias manually.');
      process.exit(0);
    }
    data.compilerOptions = data.compilerOptions || {};
    data.compilerOptions.baseUrl = data.compilerOptions.baseUrl || '.';
    data.compilerOptions.paths = data.compilerOptions.paths || {};
    data.compilerOptions.paths['@/*'] = data.compilerOptions.paths['@/*'] || ['./src/*'];
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\\n');
  "
  ok "Import alias set in tsconfig.json"
}

ensure_shadcn() {
  if [ ! -f components.json ]; then
    info "Initializing shadcn/ui"
    if [ "$(get_dep_major tailwindcss)" = "4" ]; then
      warn "Tailwind v4 detected. shadcn/ui init does not support v4 yet."
      warn "Skipping shadcn/ui init. See https://ui.shadcn.com/docs/installation for manual setup."
      return
    fi
    run_exec shadcn@latest init
    ok "shadcn/ui initialized"
  else
    ok "shadcn/ui already initialized"
  fi
}

ensure_import() {
  local entry_file="$1"
  local import_line="$2"

  if grep -qE "globals\\.css|index\\.css" "$entry_file"; then
    ok "CSS import already present in $entry_file"
    return
  fi

  info "Adding CSS import to $entry_file"
  local tmp
  tmp="$(mktemp)"
  {
    echo "$import_line"
    cat "$entry_file"
  } > "$tmp"
  mv "$tmp" "$entry_file"
  ok "CSS import added"
}

render_css() {
  cat <<'CSS'
/* BrutalUI Styling Start */
@import "tailwindcss";
@import "tw-animate-css";

@plugin "@tailwindcss/typography";

@custom-variant dark (&:is(.dark *));


:root {
  --border-radius: 5px;
  --box-shadow-x: 4px;
  --box-shadow-y: 4px;
  --reverse-box-shadow-x: -4px;
  --reverse-box-shadow-y: -4px;

  --heading-font-weight: 700;
  --base-font-weight: 500;

  --background: #fff4e6;
  --secondary-background: #ffe7cc;
  --foreground: #121212;
  --main-foreground: #121212;

  --main: #ff5d5d;
  --muted: #ffe7cc;
  --muted-foreground: #5c4f45;
  --accent: #2ec4b6;
  --accent-foreground: #121212;
  --input: #ffffff;
  --primary: #ff5d5d;
  --primary-foreground: #121212;
  --destructive: #ff5d5d;
  --destructive-foreground: #121212;
  --border: oklch(0% 0 0);
  --ring: oklch(0% 0 0);
  --overlay: oklch(0% 0 0 / 0.8);

  --shadow: var(--box-shadow-x) var(--box-shadow-y) 0px 0px var(--border);

  --chart-1: #ff5d5d;
  --chart-2: #2ec4b6;
  --chart-3: #ffb347;
  --chart-4: #121212;
  --chart-5: #5c4f45;
  --chart-active-dot: #121212;
}

:root[data-palette="soda"] {
  --background: #fff4e6;
  --secondary-background: #ffe7cc;
  --foreground: #121212;
  --main-foreground: #121212;
  --main: #ff5d5d;
  --muted: #ffe7cc;
  --muted-foreground: #5c4f45;
  --accent: #2ec4b6;
  --accent-foreground: #121212;
  --input: #ffffff;
  --primary: #ff5d5d;
  --primary-foreground: #121212;
  --destructive: #ff5d5d;
  --destructive-foreground: #121212;
  --chart-1: #ff5d5d;
  --chart-2: #2ec4b6;
  --chart-3: #ffb347;
  --chart-4: #121212;
  --chart-5: #5c4f45;
  --chart-active-dot: #121212;
}
:root[data-palette="pixel"] {
  --background: #f8f6ff;
  --secondary-background: #ede9ff;
  --foreground: #121212;
  --main-foreground: #121212;
  --main: #5b7cfa;
  --muted: #ede9ff;
  --muted-foreground: #4c4a66;
  --accent: #ffb347;
  --accent-foreground: #121212;
  --input: #ffffff;
  --primary: #5b7cfa;
  --primary-foreground: #121212;
  --destructive: #ff5d5d;
  --destructive-foreground: #121212;
  --chart-1: #5b7cfa;
  --chart-2: #ffb347;
  --chart-3: #2ec4b6;
  --chart-4: #121212;
  --chart-5: #4c4a66;
  --chart-active-dot: #121212;
}

:root[data-palette="matcha"] {
  --background: #f7fff7;
  --secondary-background: #e9f9eb;
  --foreground: #0b0b0b;
  --main-foreground: #0b0b0b;
  --main: #6eeb83;
  --muted: #e9f9eb;
  --muted-foreground: #2f4736;
  --accent: #3a86ff;
  --accent-foreground: #0b0b0b;
  --input: #ffffff;
  --primary: #6eeb83;
  --primary-foreground: #0b0b0b;
  --destructive: #ff5d5d;
  --destructive-foreground: #0b0b0b;
  --chart-1: #6eeb83;
  --chart-2: #3a86ff;
  --chart-3: #ffb347;
  --chart-4: #0b0b0b;
  --chart-5: #2f4736;
  --chart-active-dot: #0b0b0b;
}

:root[data-palette="candy"] {
  --background: #f2f2f2;
  --secondary-background: #e6e6e6;
  --foreground: #0f0f0f;
  --main-foreground: #0f0f0f;
  --main: #ff6ad5;
  --muted: #e6e6e6;
  --muted-foreground: #4f4f4f;
  --accent: #7af4f8;
  --accent-foreground: #0f0f0f;
  --input: #ffffff;
  --primary: #ff6ad5;
  --primary-foreground: #0f0f0f;
  --destructive: #ff5d5d;
  --destructive-foreground: #0f0f0f;
  --chart-1: #ff6ad5;
  --chart-2: #7af4f8;
  --chart-3: #ffb347;
  --chart-4: #0f0f0f;
  --chart-5: #4f4f4f;
  --chart-active-dot: #0f0f0f;
}

:root[data-palette="hyper"] {
  --background: #fff2f8;
  --secondary-background: #ffe3f0;
  --foreground: #111111;
  --main-foreground: #111111;
  --main: #7c5cff;
  --muted: #ffe3f0;
  --muted-foreground: #5b4a63;
  --accent: #ff7bd5;
  --accent-foreground: #111111;
  --input: #ffffff;
  --primary: #7c5cff;
  --primary-foreground: #111111;
  --destructive: #ff5d5d;
  --destructive-foreground: #111111;
  --chart-1: #7c5cff;
  --chart-2: #ff7bd5;
  --chart-3: #2ec4b6;
  --chart-4: #111111;
  --chart-5: #5b4a63;
  --chart-active-dot: #111111;
}

:root[data-palette="mono"] {
  --background: #f8f8f8;
  --secondary-background: #e6e6e6;
  --foreground: #111111;
  --main-foreground: #ffffff;
  --main: #111111;
  --muted: #e6e6e6;
  --muted-foreground: #5a5a5a;
  --accent: #d6d6d6;
  --accent-foreground: #111111;
  --input: #ffffff;
  --primary: #111111;
  --primary-foreground: #ffffff;
  --destructive: #ff5d5d;
  --destructive-foreground: #111111;
  --chart-1: #111111;
  --chart-2: #d6d6d6;
  --chart-3: #8c8c8c;
  --chart-4: #111111;
  --chart-5: #5a5a5a;
  --chart-active-dot: #111111;
}

:root[data-palette="bumble"] {
  --background: #fff7cc;
  --secondary-background: #ffef99;
  --foreground: #111111;
  --main-foreground: #111111;
  --main: #f1c40f;
  --muted: #ffef99;
  --muted-foreground: #665a1f;
  --accent: #111111;
  --accent-foreground: #ffffff;
  --input: #ffffff;
  --primary: #f1c40f;
  --primary-foreground: #111111;
  --destructive: #ff5d5d;
  --destructive-foreground: #111111;
  --chart-1: #f1c40f;
  --chart-2: #111111;
  --chart-3: #ffb347;
  --chart-4: #111111;
  --chart-5: #665a1f;
  --chart-active-dot: #111111;
}

.dark {
  --background: #1a1412;
  --secondary-background: #261c19;
  --foreground: #f8f2e9;
  --main-foreground: #121212;
  --main: #ff5d5d;
  --muted: #261c19;
  --muted-foreground: #d6c8bd;
  --accent: #2ec4b6;
  --accent-foreground: #121212;
  --input: #261c19;
  --primary: #ff5d5d;
  --primary-foreground: #121212;
  --destructive: #ff5d5d;
  --destructive-foreground: #121212;

  --border: oklch(0% 0 0);
  --ring: oklch(100% 0 0);

  --shadow: var(--box-shadow-x) var(--box-shadow-y) 0px 0px var(--border);

  --chart-active-dot: #f8f2e9;
}

.dark[data-palette="soda"] {
  --background: #1a1412;
  --secondary-background: #261c19;
  --foreground: #f8f2e9;
  --main-foreground: #121212;
  --main: #ff5d5d;
  --muted: #261c19;
  --muted-foreground: #d6c8bd;
  --accent: #2ec4b6;
  --accent-foreground: #121212;
  --input: #261c19;
  --primary: #ff5d5d;
  --primary-foreground: #121212;
  --destructive: #ff5d5d;
  --destructive-foreground: #121212;
  --chart-1: #ff5d5d;
  --chart-2: #2ec4b6;
  --chart-3: #ffb347;
  --chart-4: #f8f2e9;
  --chart-5: #d6c8bd;
  --chart-active-dot: #f8f2e9;
}

:root[data-palette="neon"] {
  --background: #f4f2ff;
  --secondary-background: #e8e3ff;
  --foreground: #141414;
  --main-foreground: #141414;
  --main: #00c2ff;
  --muted: #e8e3ff;
  --muted-foreground: #4b3f66;
  --accent: #ff6ad5;
  --accent-foreground: #141414;
  --input: #ffffff;
  --primary: #00c2ff;
  --primary-foreground: #141414;
  --destructive: #ff5d5d;
  --destructive-foreground: #141414;
  --chart-1: #00c2ff;
  --chart-2: #ff6ad5;
  --chart-3: #b7f34f;
  --chart-4: #141414;
  --chart-5: #4b3f66;
  --chart-active-dot: #141414;
}

.dark[data-palette="pixel"] {
  --background: #131227;
  --secondary-background: #1e1b38;
  --foreground: #f2f0ff;
  --main-foreground: #121212;
  --main: #5b7cfa;
  --muted: #1e1b38;
  --muted-foreground: #c4c2e0;
  --accent: #ffb347;
  --accent-foreground: #121212;
  --input: #1e1b38;
  --primary: #5b7cfa;
  --primary-foreground: #121212;
  --destructive: #ff5d5d;
  --destructive-foreground: #121212;
  --chart-1: #5b7cfa;
  --chart-2: #ffb347;
  --chart-3: #2ec4b6;
  --chart-4: #f2f0ff;
  --chart-5: #c4c2e0;
  --chart-active-dot: #f2f0ff;
}

.dark[data-palette="matcha"] {
  --background: #0f1a12;
  --secondary-background: #15251a;
  --foreground: #e9ffe9;
  --main-foreground: #0b0b0b;
  --main: #6eeb83;
  --muted: #15251a;
  --muted-foreground: #b8d7c2;
  --accent: #3a86ff;
  --accent-foreground: #0b0b0b;
  --input: #15251a;
  --primary: #6eeb83;
  --primary-foreground: #0b0b0b;
  --destructive: #ff5d5d;
  --destructive-foreground: #0b0b0b;
  --chart-1: #6eeb83;
  --chart-2: #3a86ff;
  --chart-3: #ffb347;
  --chart-4: #e9ffe9;
  --chart-5: #b8d7c2;
  --chart-active-dot: #e9ffe9;
}

.dark[data-palette="candy"] {
  --background: #1c1c1c;
  --secondary-background: #262626;
  --foreground: #f5f5f5;
  --main-foreground: #0f0f0f;
  --main: #ff6ad5;
  --muted: #262626;
  --muted-foreground: #cfcfcf;
  --accent: #7af4f8;
  --accent-foreground: #0f0f0f;
  --input: #262626;
  --primary: #ff6ad5;
  --primary-foreground: #0f0f0f;
  --destructive: #ff5d5d;
  --destructive-foreground: #0f0f0f;
  --chart-1: #ff6ad5;
  --chart-2: #7af4f8;
  --chart-3: #ffb347;
  --chart-4: #f5f5f5;
  --chart-5: #cfcfcf;
  --chart-active-dot: #f5f5f5;
}

.dark[data-palette="hyper"] {
  --background: #15101b;
  --secondary-background: #1f1728;
  --foreground: #f8f5ff;
  --main-foreground: #111111;
  --main: #7c5cff;
  --muted: #1f1728;
  --muted-foreground: #d1c7e6;
  --accent: #ff7bd5;
  --accent-foreground: #111111;
  --input: #1f1728;
  --primary: #7c5cff;
  --primary-foreground: #111111;
  --destructive: #ff5d5d;
  --destructive-foreground: #111111;
  --chart-1: #7c5cff;
  --chart-2: #ff7bd5;
  --chart-3: #2ec4b6;
  --chart-4: #f8f5ff;
  --chart-5: #d1c7e6;
  --chart-active-dot: #f8f5ff;
}

.dark[data-palette="mono"] {
  --background: #0f0f0f;
  --secondary-background: #1a1a1a;
  --foreground: #f5f5f5;
  --main-foreground: #0f0f0f;
  --main: #f5f5f5;
  --muted: #1a1a1a;
  --muted-foreground: #bdbdbd;
  --accent: #2a2a2a;
  --accent-foreground: #f5f5f5;
  --input: #1a1a1a;
  --primary: #f5f5f5;
  --primary-foreground: #0f0f0f;
  --destructive: #ff5d5d;
  --destructive-foreground: #0f0f0f;
  --chart-1: #f5f5f5;
  --chart-2: #bdbdbd;
  --chart-3: #8c8c8c;
  --chart-4: #f5f5f5;
  --chart-5: #bdbdbd;
  --chart-active-dot: #f5f5f5;
}

.dark[data-palette="bumble"] {
  --background: #15120a;
  --secondary-background: #1f1a0b;
  --foreground: #fff7cc;
  --main-foreground: #111111;
  --main: #f1c40f;
  --muted: #1f1a0b;
  --muted-foreground: #d6c78a;
  --accent: #111111;
  --accent-foreground: #ffffff;
  --input: #1f1a0b;
  --primary: #f1c40f;
  --primary-foreground: #111111;
  --destructive: #ff5d5d;
  --destructive-foreground: #111111;
  --chart-1: #f1c40f;
  --chart-2: #111111;
  --chart-3: #ffb347;
  --chart-4: #fff7cc;
  --chart-5: #d6c78a;
  --chart-active-dot: #fff7cc;
}

@theme inline {
  --color-main: var(--main);
  --color-background: var(--background);
  --color-secondary-background: var(--secondary-background);
  --color-foreground: var(--foreground);
  --color-main-foreground: var(--main-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-input: var(--input);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-overlay: var(--overlay);
  --color-ring: var(--ring);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --spacing-boxShadowX: var(--box-shadow-x);
  --spacing-boxShadowY: var(--box-shadow-y);
  --spacing-reverseBoxShadowX: var(--reverse-box-shadow-x);
  --spacing-reverseBoxShadowY: var(--reverse-box-shadow-y);

  --radius-base: var(--border-radius);

  --shadow-shadow: var(--shadow);
  --shadow-nav: 4px 4px 0px 0px var(--border);
  --shadow-darkNav: 4px 4px 0px 0px var(--dark-border);

  --font-weight-base: var(--base-font-weight);
  --font-weight-heading: var(--heading-font-weight);

  --animate-marquee: marquee 5s linear infinite;
  --animate-marquee2: marquee2 5s linear infinite;

  --spacing-container: 1300px;

  @keyframes marquee {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes marquee2 {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
}

@layer base {
  body {
    @apply text-foreground font-base;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-heading;
  }
}

body,
.scrollbar {
  --sb-track-color: #ffffff;
  --sb-thumb-color: #000000;
}

html.dark body,
html.dark .scrollbar {
  --sb-track-color: #1f1f1f;
  --sb-thumb-color: #e6e6e6;
}

.scrollbar::-webkit-scrollbar {
  width: 16px;
}

body::-webkit-scrollbar {
  width: 20px;
}

.toc-scrollbar::-webkit-scrollbar {
  width: 0px;
}

body::-webkit-scrollbar-track,
.scrollbar::-webkit-scrollbar-track {
  background: var(--sb-track-color);
}

body::-webkit-scrollbar-track {
  border-left: 4px solid #000;
}

body::-webkit-scrollbar-thumb,
.scrollbar::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
}

html.dark body::-webkit-scrollbar-thumb {
  border-left: 4px solid #000;
}

.code::-webkit-scrollbar-track {
  background: transparent;
}

.code::-webkit-scrollbar-thumb {
  background: white;
}

.code::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border: 0 !important;
}

.code::-webkit-scrollbar-corner {
  background: transparent !important;
  border: 0 !important;
}

.command-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.command-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.command-scrollbar::-webkit-scrollbar-thumb {
  background: #000;
}

@supports not selector(::-webkit-scrollbar) {
  body,
  .scrollbar {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }

  .command-scrollbar {
    scrollbar-color: #000 transparent;
  }
}
.dark[data-palette="neon"] {
  --background: #14101c;
  --secondary-background: #1e172a;
  --foreground: #f7f2ff;
  --main-foreground: #141414;
  --main: #00c2ff;
  --muted: #1e172a;
  --muted-foreground: #d2c8f2;
  --accent: #ff6ad5;
  --accent-foreground: #141414;
  --input: #1e172a;
  --primary: #00c2ff;
  --primary-foreground: #141414;
  --destructive: #ff5d5d;
  --destructive-foreground: #141414;
  --chart-1: #00c2ff;
  --chart-2: #ff6ad5;
  --chart-3: #b7f34f;
  --chart-4: #f7f2ff;
  --chart-5: #d2c8f2;
  --chart-active-dot: #f7f2ff;
}
/* BrutalUI Styling End */
CSS
}

apply_css() {
  local css_file="$1"

  if [ -n "${BRUTALUI_CSS:-}" ]; then
    info "Using BRUTALUI_CSS from environment"
    printf "%s\n" "$BRUTALUI_CSS" > "$css_file"
    ok "Custom CSS written to $css_file"
    return
  fi

  if [ -n "${BRUTALUI_CSS_URL:-}" ]; then
    info "Fetching CSS from $BRUTALUI_CSS_URL"
    if command -v curl >/dev/null 2>&1; then
      curl -fsSL "$BRUTALUI_CSS_URL" > "$css_file"
      ok "Custom CSS written to $css_file"
      return
    fi
    if command -v wget >/dev/null 2>&1; then
      wget -qO "$css_file" "$BRUTALUI_CSS_URL"
      ok "Custom CSS written to $css_file"
      return
    fi
    die "curl or wget is required for BRUTALUI_CSS_URL"
  fi

  if [ -f "$css_file" ] && grep -q "BrutalUI Styling Start" "$css_file"; then
    info "Updating BrutalUI styling in $css_file"
    local tmp
    tmp="$(mktemp)"
    awk -v repl="$(render_css)" '
      BEGIN { skip = 0 }
      /BrutalUI Styling Start/ { print repl; skip = 1; next }
      /BrutalUI Styling End/ { skip = 0; next }
      skip == 0 { print }
    ' "$css_file" > "$tmp"
    mv "$tmp" "$css_file"
    ok "BrutalUI styling updated"
    return
  fi

  info "Writing BrutalUI styling to $css_file"
  render_css >> "$css_file"
  ok "BrutalUI styling written"
}

framework="$(detect_framework)"
info "Detected framework: $framework"

ensure_tailwind
ensure_vite_alias
ensure_shadcn

css_file=""
entry_file=""
import_line=""

case "$framework" in
  next-app)
    if [ -f src/app/layout.tsx ]; then
      entry_file="src/app/layout.tsx"
      css_file="src/app/globals.css"
      import_line='import "./globals.css"'
    elif [ -f src/app/layout.jsx ]; then
      entry_file="src/app/layout.jsx"
      css_file="src/app/globals.css"
      import_line='import "./globals.css"'
    elif [ -f app/layout.tsx ]; then
      entry_file="app/layout.tsx"
      css_file="app/globals.css"
      import_line='import "./globals.css"'
    elif [ -f app/layout.jsx ]; then
      entry_file="app/layout.jsx"
      css_file="app/globals.css"
      import_line='import "./globals.css"'
    fi
    ;;
  next-pages|next)
    if [ -f src/pages/_app.tsx ]; then
      entry_file="src/pages/_app.tsx"
      css_file="src/styles/globals.css"
      import_line='import "../styles/globals.css"'
    elif [ -f src/pages/_app.jsx ]; then
      entry_file="src/pages/_app.jsx"
      css_file="src/styles/globals.css"
      import_line='import "../styles/globals.css"'
    elif [ -f pages/_app.tsx ]; then
      entry_file="pages/_app.tsx"
      css_file="styles/globals.css"
      import_line='import "../styles/globals.css"'
    elif [ -f pages/_app.jsx ]; then
      entry_file="pages/_app.jsx"
      css_file="styles/globals.css"
      import_line='import "../styles/globals.css"'
    fi
    ;;
  vite)
    if [ -f src/main.tsx ]; then
      entry_file="src/main.tsx"
      css_file="src/index.css"
      import_line='import "./index.css"'
    elif [ -f src/main.jsx ]; then
      entry_file="src/main.jsx"
      css_file="src/index.css"
      import_line='import "./index.css"'
    elif [ -f src/main.ts ]; then
      entry_file="src/main.ts"
      css_file="src/index.css"
      import_line='import "./index.css"'
    elif [ -f src/main.js ]; then
      entry_file="src/main.js"
      css_file="src/index.css"
      import_line='import "./index.css"'
    fi
    ;;
esac

if [ -z "$entry_file" ] || [ -z "$css_file" ]; then
  die "Could not find a supported entry file. Expected Next app/layout, Next pages/_app, or Vite src/main."
fi

mkdir -p "$(dirname "$css_file")"
touch "$css_file"
ok "Using CSS file: $css_file"
ensure_import "$entry_file" "$import_line"
apply_css "$css_file"

ok "Install complete"
info "Tip: set BRUTALUI_CSS or BRUTALUI_CSS_URL for a custom vibe."

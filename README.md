[![CI](https://github.com/flow145/express-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/flow145/express-starter/actions/workflows/ci.yml)

# Express starter

A practical starter for Express backend apps with TypeScript, PostgreSQL, and Drizzle ORM.

## Features

- **Express 5** with common production middleware
- **PostgreSQL** with **Drizzle ORM** in a Docker container
- **TypeScript** strict configuration with path aliases (`#/*` maps to `src/*`)
- **Multiple environments** setup
- **Validation** middleware with Zod
- **Logging** with Pino
- **Testing** with Vitest and Supertest
- **pnpm** - efficient package manager
- **Biome** for linting and formatting (with EditorConfig support)
- **Git hooks** - quality checks on pre-commit and pre-push via `lefthook`
- **Commit validation** via Commitlint (Conventional Commits)
- **CI** via GitHub Actions (runs on push and pull request)

## Prerequisites

- Node.js 24+
- pnpm 11+
- Docker

_The listed tools can be installed with [Mise](https://mise.jdx.dev/), a fast, cross-platform tool version manager._

## Get started

1. Click the `Use this template` button on GitHub or clone locally:

   ```sh
   pnpm dlx degit flow145/express-starter express-project
   ```

   Both methods will clean the git history.

   _[degit](https://github.com/Rich-Harris/degit)_

2. Update and install the dependencies:

   ```sh
   pnpm up -i --latest
   ```

3. Update the environment variables for development and testing:

   ```sh
   cp .env.example .env.development
   cp .env.example .env.test
   ```

   Also update:

   - variables in [ci.yml](./.github/workflows/ci.yml)
   - database names in [create-databases.sh](./scripts/create-databases.sh)
   - container and volume names in [docker-compose.yml](./docker-compose.yml).

4. Start the container with the database:

   ```sh
   pnpm db:up
   ```

5. Apply the database schema for development:

   ```sh
   pnpm db:push
   pnpm db:seed
   ```

6. Run the app:

   ```sh
   pnpm dev
   ```

7. Check out the available scripts in [`package.json`](./package.json) or execute `pnpm run`.

## Endpoints

- `GET /health` - health check
- `GET /api/users` - example users resource backed by Drizzle and Postgres

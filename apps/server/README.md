# Minimalist TypeScript Backend Boilerplate

## Getting started
```bash
npx degit https://github.com/muhrizqiardi/minimal-ts-be-boilerplate.git .
```

## To do list after cloning
- [ ] Change project name on package.json
- [ ] Change project author on package.json
- [ ] Change LICENSE file
- [ ] Modify README.md

## Included

- Out of the box TypeScript support, also using ts-node-dev for running it in dev environment
- Also out of the box ES6 syntax
- dotenv
- Uses yarn for package management
- Path aliasing for easier module imports, like "@controllers/...", "@services/...", etc.
- Install frameworks (Fastify, Express) by yourself

## Scripts

### `yarn dev:start`

Starts server in development environment and auto refresh.

### `yarn build`

Build and output into ./dist directory

### `yarn production:start`

Starts server from ./dist directory in production environment and auto refresh.

## Quick References

### Installing TypeScript

```bash
yarn add dotenv ts-node typescript
yarn add -D @types/node ts-node-dev tsconfig-paths
```

### Installing Fastify

```bash
yarn add fastify
```

### Installing Express

```bash
yarn add express
yarn add -D @types/express
```

### Modifying path aliases (example)

```json
{
  // be sure to set the baseUrl first
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"],
    "@services/*": ["./src/services/*"],
    "@controllers/*": ["./src/controllers/*"],
    "@models/*": ["./src/models/*"]
  },
  "ts-node": {
    // install tsconfig-paths package first
    "require": ["tsconfig-paths/register"]
  }
}
```

### Installing Prisma with PostgreSQL (using docker)

Installing all the dependencies, then initializing Prisma.

```bash
# installing prisma as devDependency
yarn add -D prisma

# installing prisma client
yarn add @prisma/client

# creating prisma directory with schema.prisma and also .env file
npx prisma init
```

Adding docker-compose.yml file for the PostgreSQL DB container.

```yml
version: "3.8"
services:
  postgres:
    image: postgres:13
    container_name: postgres
    restart: always
    ports:
      - 5432:5432
    env_file:
      - .env
    volumes:
      - postgres:/var/lib/postgresql/data

volumes:
  postgres:
    name: db
```

Editing the .env file (these are only an example, be sure to change it).

```bash
# POSTGRES
POSTGRES_USER=prisma
POSTGRES_PASSWORD=topsecret
POSTGRES_DB=db

DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA=db

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}&sslmode=prefer
```

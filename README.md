# Shopping Cart API

The Shopping Cart API is a RESTful API that allows users to manage their shopping carts. It provides endpoints for adding items to the cart, removing items from the cart, and confirm the cart.

## Tech

Tech Stack to use: Nest.js + TypeScript + PostgreSQL + Prisma + Jest

## Installation

```bash
$ yarn install
```

**Creating and Migrating Databases**

Run migrations using Prisma:

```bash
$ yarn migrate
```

**Environment Setup**

Ensure you have a `.env` file at the root of the project with the necessary environment variables.

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Stay in touch

- Author - [Mariano Pizarro](http://www.linkedin.com/in/mariano-pizarro-70317932)
- GitHub - [http://github.com/m-pizarro](http://github.com/m-pizarro)

## License

Nest is [MIT licensed](LICENSE).

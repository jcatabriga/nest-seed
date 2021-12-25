<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    
## Description

A Seed to start a Nest application easily with some features already configured

Our Features:

- CORS and Helmet Configured
- eslint and prettier configured
- Prisma Configured
- Docker Compose with PostgresSQL to development
- Docs with Swagger
- Timeout interceptor
- Validation with class validators
- Pipe to modify numeric request queries
- Useful DTOs to filter requests

Future features:

- Authorization and authentication with Guards
- Cookies
- Auth decorator grouping
- Logging
- Middlewares

## Installation

```bash
$ yarn install
```

## Start database

```bash
$ docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

More info soon

## License

Nest is [MIT licensed](LICENSE).

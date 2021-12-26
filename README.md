# Shoulders: Nest Seed

<div display="flex" align="center" justify="space-between" flex="auto">
<img src="./.github/images/Shoulders-Icon.svg" width="128" alt="Shoulders Logo" >

<p align="center">A smart organization that aims to facilitate the understanding of complexity</p>
<br>
<br>

<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
</div>  
    
<br><hr>

## Description

🚀 This ia a seed to start a Nest application easily with useful features already configured!

<hr>

### Our Features:

- Security:
  - CORS
  - Helmet
- Facilitators
  - eslint and prettier configured
  - Prisma Configured
  - Docker Compose with PostgresSQL to development
- Features
  - Pipe to modify numeric request queries
  - Timeout interceptor
  - Docs with Swagger
  - Validation with class validators
  - Useful DTOs to filter requests

### Working on:

- Cookies
- Authorization and authentication with CASL

### Future features:

- Security:
  - Rate Limiting
  - CSRF Protection
- Facilitators
  - Auth decorator that group auth logical
- Features
  - Logging
  - File Upload

### Analyzing:

- GraphQL Branch
- Websocket Branch
- Microservice (gRPC) Branch

<hr>

## Installation

```bash
$ yarn install
```

## Start database

```bash
$ docker-compose up -d
```

## Run Migrations

```bash
# You can edit prisma/schema.prisma before run (optional)
$ npx prisma migrate dev
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

<hr>

## Import Insomnia

If you use the `insomnia` to test your requests we have prepared a configured file to start testing our API.

<!-- Button Here -->

<br><hr>

## Swagger

To view the documentation just access http://localhost:3000/api while the project is running

You can edit this URL configuration at file `config/app.ts`

<hr>

## Support

More info soon

## License

Nest is [MIT licensed](LICENSE).

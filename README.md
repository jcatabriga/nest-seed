# Shoulders: Nest Seed

<div display="flex" align="center" justify="space-between" flex="auto">
<img src="./.github/images/Shoulders-Icon.svg" width="128" alt="Shoulders Logo" >

<p align="center">A smart organization that aims to facilitate the understanding of complexity</p>
<br>
<br>

<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
</div>  
    
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

## Swagger

To view the documentation just access http://localhost:3000/api while the project is running

You can edit this URL configuration at file `config/app.ts`

## Support

More info soon

## License

Nest is [MIT licensed](LICENSE).

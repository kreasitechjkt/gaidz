
# Installation

```bash
# node_modules
$ npm i
# OR
$ npm ci
```

# Configuration
1. Create `.env` file
2. Edit config
  - Edit file in config/envs directory.
  - `default` - `development` - `production`

# Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run lint
$ npm run build
$ npm run start:prod
```

# Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Docs
```bash
# APP, Compodoc
$ npm run doc #> http://localhost:8080

# API, Swagger
$ npm run doc:api #> http://{host}:{port}/api
```

# Resources
- [nestjs-project-structure](https://github.com/CatsMiaow/nestjs-project-structure)
- [awesome-nestjs](https://github.com/nestjs/awesome-nestjs)

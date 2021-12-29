# A domain adviser app built with Node.js, typescript, postgres and a third party api service 
## Requirements
- Node 14
- Git
- Docker

## Notes
- Note 1: Make sure to rename .env.example to .env 
- Note 2: This repository includes the postman collection for the finished API
- Note 3: Application will run with `docker-compose up -d --build` command as it creates containers for both the node-app & postgres-db. 
- Note 4: But you can also run with `yarn dev`. In that case you have to run the postgres-db first. (commmand is in below)

## Git clone
Clone the repo and install the dependencies.
```
git clone https://github.com/nazmoonnoor/domain-adviser-api.git
cd domain-adviser-api
```

### Install node dependencies
- `yarn install`

### Build docker containers
- `docker-compose up -d --build`

### Common commands to build and shutdown the docker containers

- `docker-compose up -d --build && docker-compose logs -f` => build with logs
- `docker-compose down -d` => shutdown containers. 
- `docker-compose down -d -v` => shutdown containers including volume. 


## docker-compose command to run only the postgres-db

- `docker-compose up -d --build db`

## pg commands

- `docker exec -it <container_id> /bin/sh`
- `psql -U postgres domain_check_db`
- `\q` => quit pg shell
- `\l` => list db
- `\dt` => list database

## Available commands
    `yarn dev` to run the app.
    `yarn build` will build the app for production
    `yarn prod` to run app on production
    `yarn test` will run all tests with jest test-runner
    `test:watch` to live test
    `test:coverage` to jest coverages
    `lint` with eslint
    `lint:fix` fix the lint issues

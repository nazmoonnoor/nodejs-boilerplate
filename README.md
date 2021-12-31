# A domain adviser api built with Node.js, typescript, postgres and a third party api service

## Tools

- Using docker and docker-compose, so that the project can be run in any machine with little effort.
- Using eslint/prettier with the goal to making code more consistent and avoiding bugs.
- Yarn as package manager
- Postman to execute the endpoints
- jest and supertest to unit test

## Requirements

- Node 14
- Git
- Docker

## Notes

- Note 1: This repository includes the postman collection for the finished API
- Note 2: Application will run with `docker-compose up -d --build` command as it creates docker containers for both the node-app & postgres-db.
- Note 3: Docker compose has worked as expected. But incase it has issue, run the setup without docker. In that case you have to change .env file based on your postgres setup.

## Git clone

Clone the repo and install the dependencies.

```
git clone https://github.com/nazmoonnoor/domain-adviser-api.git
cd domain-adviser-api
```

## Setup steps (with docker)

- Make a copy or rename .env.example to .env which have all the environment variable. Update SCANADVISER_KEY.

### Batch file to install

- Open up the `installer` folder
- Run `install.bat` to install. It will install the docker containers for postgres-db and node application.
- Run `unsinstall.bat` to shut down the services.

### Alternatively use docker commands to install

- Run `docker-compose up -d --build`
- Use `docker-compose down -d -v` to remove services

## Setup steps (without docker)

- `yarn install`
- `yarn dev`
- Install postgres-db and change .env file based on your environment values.

## Run use cases with Postman collection

- Postman collection and environment json has been share on root folder. Please download them and import to postman.
- `/healthcheck` to verify service availability
- Run `/run-migrations` to create db tables
- Create domain, pass a URL to the service. Example payload is given with the collection.
- Get domain by url, will return already stored results of a domain, so that changes over time can be seen.
- Get domain by dates, with start and end date it will return stored results from db.

## Project structure

![scam_checker-project structure drawio](https://user-images.githubusercontent.com/1157439/147714809-7c6b684c-a202-4d38-95fa-bccd122ea157.png)

## Docker container - pg commands

- `docker exec -it domain_adviser_db /bin/sh`
  After running db migration
- `psql -U postgres domain_adviser_db`

## Available commands

    `yarn dev` to run the app.
    `yarn build` will build the app for production
    `yarn prod` to run app on production
    `yarn test` will run all tests with jest test-runner
    `test:watch` to live test
    `test:coverage` to jest coverages
    `lint` with eslint
    `lint:fix` fix the lint issues

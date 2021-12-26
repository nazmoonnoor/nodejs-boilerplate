## Requirements
Node 14
Git
Docker

## Common setup
Clone the repo and install the dependencies.

git clone https://github.com/nazmoonnoor/domain-adviser-api.git
cd domain-adviser-api

### Install node dependencies
`yarn install`

### Build docker containers
`docker-compose up -d --build`

### Common commands to build and shutdown the docker containers
`docker-compose up -d --build && docker-compose logs -f` => build with logs
`docker-compose down -d` => shutdown containers. 
`docker-compose down -d -v` => shutdown containers including volume. 

## Command to run only the db

`docker-compose up -d --build db`

## pg commands

`docker exec -it <container_id> /bin/sh`
`psql -U postgres domain_check_db`
`\q` => quit pg shell
`\l` => list db
`\dt` => list database

### init project

yarn init

## dependencies

yarn add express zod config cors pino pino-pretty bcrypt lodash nanoid dotenv

## dev-dependencies

yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/pino @types/bcrypt @types/lodash @types/nanoid ts-node-dev typescript -D

# ts-config

npx tsc --init

# ESLint / Prettier

yarn add -D eslint
npx eslint --init
yarn add -D prettier
yarn add -D eslint-plugin-prettier eslint-config-prettier
yarn add -D eslint-import-resolver-typescript tsconfig-paths
yarn add -D eslint-config-airbnb-typescript eslint-plugin-eslint-comments eslint-plugin-jest eslint-plugin-promise

# jest

yarn add -D jest ts-jest @types/jest

# postgres

yarn add node-postgres postgres-migrations
yarn add -D @types/pg

# Kill a port in Use

netstat -aon
taskkill /F /PID <PID>

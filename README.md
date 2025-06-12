# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Installing NPM modules

```
npm install
```

## Crete .env file

```
cp .env.example .env
```

## Running application

### Start
```
docker compose up -d
```

### Stop
```
docker compose down
or
docker compose down -v (remove volumes)
```

## Running migrations
Run the following command to execute database migrations inside the running container:
```
docker compose exec node npm run migration:run
```

## Swagger
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Check vulnerabilities
```
npm run audit
```

## Pull docker image
Built image of nest application can be downloaded with the next command:
```
docker pull ilozhechnikov/nodejs2025q2:1.0
```

## Testing

After application running open new terminal and enter:


To run all test with authorization

```
npm run test:auth
```

To run all test for refresh token

```
npm run test:refresh
```

### Lint

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

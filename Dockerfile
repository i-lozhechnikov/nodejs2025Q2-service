FROM node:22-alpine AS node-base

WORKDIR /app

ENV APP_ENV=production
ENV NODE_ENV=production

FROM node-base AS node-dev

ENV APP_ENV=development

RUN npm install -g @nestjs/cli

CMD ["npm", "run", "start:dev"]

FROM node-base AS node-build

COPY package.json tsconfig.json tsconfig.build.json package-lock.json ./

RUN npm install -g @nestjs/cli
RUN npm install --frozen-lockfile --production=true

COPY migrations ./migrations
COPY src ./src
COPY doc ./doc

RUN npm run build

FROM node-base AS node-prod

WORKDIR /app

COPY --from=node-build /app/dist ./dist
COPY --from=node-build /app/node_modules ./node_modules

CMD ["npm", "run", "start:prod"]

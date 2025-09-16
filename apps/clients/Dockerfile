FROM node:18-alpine AS builder
RUN apk update && apk upgrade
RUN corepack enable
WORKDIR /app

COPY . .

RUN CI=true NODE_ENV=development pnpm install --frozen-lockfile

RUN pnpm --filter clients run build

FROM nginx:stable-alpine
RUN apk update && apk upgrade

COPY apps/clients/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/apps/clients/dist /usr/share/nginx/html
EXPOSE 80
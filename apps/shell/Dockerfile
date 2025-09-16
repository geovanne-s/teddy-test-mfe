FROM node:18-alpine AS builder
ARG VITE_CLIENTS_APP_URL
ENV VITE_CLIENTS_APP_URL=$VITE_CLIENTS_APP_URL


RUN apk update && apk upgrade
RUN corepack enable
WORKDIR /app

COPY . .


RUN CI=true NODE_ENV=development pnpm install --frozen-lockfile

RUN echo "VERIFICANDO VARIAVEL: VITE_CLIENTS_APP_URL é: $VITE_CLIENTS_APP_URL"

RUN pnpm --filter shell run build


FROM nginx:stable-alpine
RUN apk update && apk upgrade

COPY apps/shell/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/apps/shell/dist /usr/share/nginx/html
EXPOSE 80
FROM node:20-alpine AS builder
WORKDIR /app

ARG EXPO_PUBLIC_API_URL
ARG EXPO_PUBLIC_SPOTIFY_CLIENT_ID

ENV EXPO_PUBLIC_API_URL=$EXPO_PUBLIC_API_URL
ENV EXPO_PUBLIC_SPOTIFY_CLIENT_ID=$EXPO_PUBLIC_SPOTIFY_CLIENT_ID

RUN echo "==== DEBUG: Build-time API URL is [$EXPO_PUBLIC_API_URL] ===="

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build-web

RUN npx tsc --project tsconfig.server.json


FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/serve ./serve

COPY --from=builder /app/dist/server.js ./server.js

EXPOSE 80

CMD ["node", "server.js"]
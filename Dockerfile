FROM node:20-alpine AS builder
WORKDIR /app

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
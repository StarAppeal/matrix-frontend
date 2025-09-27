# Development stage für Hot Reload
FROM node:20-bullseye AS development
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Expose ports for Expo development server
EXPOSE 9090 8081 19000 19001

CMD ["npm", "run", "start"]

# Production build stage
FROM node:20-alpine AS production-builder
WORKDIR /app

ARG EXPO_PUBLIC_API_URL
ARG EXPO_PUBLIC_SPOTIFY_CLIENT_ID

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN EXPO_PUBLIC_API_URL=$EXPO_PUBLIC_API_URL EXPO_PUBLIC_SPOTIFY_CLIENT_ID=$EXPO_PUBLIC_SPOTIFY_CLIENT_ID npm run build-web
RUN npx tsc --project tsconfig.server.json

# Production stage
FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=production-builder /app/serve ./serve

COPY --from=production-builder /app/dist/server.js ./server.js

EXPOSE 80

CMD ["node", "server.js"]
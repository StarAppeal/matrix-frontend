# Development stage für Hot Reload
FROM node:20-bullseye AS development
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Expose ports for Expo development server
EXPOSE 9090 8081 19000 19001

CMD ["npm", "run", "start"]

# Production build stage
FROM node:20-alpine AS production-builder
WORKDIR /app

ARG EXPO_PUBLIC_API_URL
ARG EXPO_PUBLIC_SPOTIFY_CLIENT_ID

ENV EXPO_PUBLIC_API_URL=$EXPO_PUBLIC_API_URL
ENV EXPO_PUBLIC_SPOTIFY_CLIENT_ID=$EXPO_PUBLIC_SPOTIFY_CLIENT_ID

RUN echo "API_URL=$EXPO_PUBLIC_API_URL"

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build-web
RUN npx tsc --project tsconfig.server.json

# Production stage
FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev --legacy-peer-deps

COPY --from=production-builder /app/serve ./serve

COPY --from=production-builder /app/dist/server.js ./server.js

EXPOSE 80

CMD ["node", "server.js"]
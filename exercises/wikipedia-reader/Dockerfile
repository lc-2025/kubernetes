FROM node:22-alpine AS build
WORKDIR /usr/src/app
RUN --mount=type=bind,source=.,target=/src \
  mkdir -p ./lib/logger ./exercises/wikipedia-reader && \
  cp /src/package*.json . && \
  cp /src/lib/logger/package*.json ./lib/logger/ && \
  cp /src/exercises/wikipedia-reader/package*.json ./exercises/wikipedia-reader/ && \
  npm ci && \
  cp -r /src/lib/logger/src ./lib/logger/src && \
  cp -r /src/lib/logger/dist ./lib/logger/dist && \
  cp -r /src/exercises/wikipedia-reader/src ./exercises/wikipedia-reader/src && \
  cp /src/exercises/wikipedia-reader/tsconfig.json ./exercises/wikipedia-reader/ && \
  npm run build -w dwk-wikipedia-reader
FROM node:22-alpine AS run
WORKDIR /usr/src/app
ARG PORT=5000
ENV PORT=${PORT}
RUN --mount=type=bind,from=build,source=/usr/src/app,target=/build \
  mkdir -p ./wikipedia-reader && \
  cp /build/exercises/wikipedia-reader/package*.json ./wikipedia-reader/ && \
  cp -r /build/exercises/wikipedia-reader/node_modules ./wikipedia-reader/node_modules && \
  cp -r /build/exercises/wikipedia-reader/dist ./wikipedia-reader/dist && \
  adduser -D appuser && \
  mkdir -p /etc/sudoers.d && \
  echo "appuser ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/appuser && \
  chmod 0440 /etc/sudoers.d/appuser
WORKDIR /usr/src/app/wikipedia-reader
EXPOSE $PORT
USER appuser
CMD ["npm", "run", "start"]

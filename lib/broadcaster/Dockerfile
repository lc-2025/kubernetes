FROM node:22-alpine AS build
WORKDIR /usr/src/app
RUN --mount=type=bind,source=.,target=/src \
  mkdir -p ./lib/broadcaster ./lib/messenger ./lib/logger ./lib/utilities && \
  cp /src/package*.json . && \
  cp /src/lib/broadcaster/package*.json ./lib/broadcaster/ && \
  cp /src/lib/messenger/package*.json ./lib/messenger/ && \
  cp /src/lib/logger/package*.json ./lib/logger/ && \
  cp /src/lib/utilities/package*.json ./lib/utilities/ && \
  npm ci && \
  cp -r /src/lib/utilities ./lib/utilities && \
  cp -r /src/lib/logger ./lib/logger && \
  cp -r /src/lib/messenger ./lib/messenger && \
  cp -r /src/lib/broadcaster ./lib/broadcaster && \
  npm run build
FROM node:22-alpine AS run
WORKDIR /usr/src/app
ARG PORT=4080
ENV PORT=${PORT}
RUN --mount=type=bind,from=build,source=/usr/src/app,target=/build \
  mkdir -p ./broadcaster && \
  cp /build/lib/broadcaster/package*.json ./broadcaster/ && \
  cp -r /build/lib/broadcaster/node_modules ./broadcaster/node_modules && \
  cp -r /build/lib/broadcaster/dist ./broadcaster/dist && \
  adduser -D appuser && \
  mkdir -p /etc/sudoers.d && \
  echo "appuser ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/appuser && \
  chmod 0440 /etc/sudoers.d/appuser
WORKDIR /usr/src/app/broadcaster
EXPOSE $PORT
USER appuser
CMD ["npm", "run", "start"]

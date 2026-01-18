FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY lib/broadcaster/package*.json ./lib/broadcaster/
COPY lib/messenger/package*.json ./lib/messenger/
COPY lib/logger/package*.json ./lib/logger/
COPY lib/utilities/package*.json ./lib/utilities/
RUN npm ci
COPY lib/utilities/ ./lib/utilities/
COPY lib/logger/ ./lib/logger/
COPY lib/messenger/ ./lib/messenger/
COPY lib/broadcaster/ ./lib/broadcaster/
RUN npm run build
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

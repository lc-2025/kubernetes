FROM node:22-alpine AS setup
WORKDIR /usr/src/app
COPY package* .
RUN npm i
FROM setup AS build
COPY . .
RUN npm run build
FROM node:22-alpine AS run
WORKDIR /usr/src/app
ARG PORT
ENV PORT=${PORT}
RUN --mount=type=bind,from=build,source=/usr/src/app,target=/build \
  cp /build/package*.json . \
  && cp -r /build/node_modules ./node_modules \
  && cp -r /build/dist ./dist \
  && cp -r /build/src/views ./dist \
  && adduser -D appuser \
  && mkdir -p /etc/sudoers.d \
  && echo "appuser ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/appuser \
  && chmod 0440 /etc/sudoers.d/appuser
EXPOSE $PORT
USER appuser
CMD ["npm", "run", "start"]

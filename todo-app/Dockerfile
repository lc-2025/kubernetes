FROM node:22-alpine AS setup
WORKDIR /usr/src/app
COPY package* .
RUN npm i
FROM setup AS build
COPY . .
ARG DATABASE_URL \
  API_TODO \
  BASE_PATHNAME \
  BASE_URL \
  HOST \
  WINDOW \
  WIKI_RANDOM \
  PORT
ENV DATABASE_URL=${DATABASE_URL} \
  API_TODO=${API_TODO} \
  BASE_PATHNAME=${BASE_PATHNAME} \
  BASE_URL=${BASE_URL} \
  HOST=${HOST} \
  WINDOW=${WINDOW} \
  WIKI_RANDOM=${WIKI_RANDOM} \
  PORT=4000
RUN npm run build
FROM build
EXPOSE $PORT
RUN adduser -D appuser \
  && mkdir -p /etc/sudoers.d \
  && echo "appuser ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/appuser \
  && chmod 0440 /etc/sudoers.d/appuser
USER appuser
CMD ["npm", "run", "start"]

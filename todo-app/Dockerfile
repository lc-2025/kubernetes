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
  PORT=${PORT}
RUN npm run build
FROM node:22-alpine AS run
ARG PORT
ENV PORT=${PORT}
COPY --from=build /usr/src/app/package*.json /usr/src/app/node_modules /usr/src/app/dist /usr/src/app/src/views ./
RUN cp -r ./views ./dist \
  && adduser -D appuser \
  && mkdir -p /etc/sudoers.d \
  && echo "appuser ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/appuser \
  && chmod 0440 /etc/sudoers.d/appuser
EXPOSE $PORT
USER appuser
CMD ["npm", "run", "start"]

FROM node:22-alpine AS setup
WORKDIR /usr/src/app
COPY package* .
RUN npm i
FROM setup AS build
COPY . .
ENV PORT=4000
RUN npm run build
FROM build
EXPOSE $PORT
RUN adduser -D appuser \
  && mkdir -p /etc/sudoers.d \
  && echo "appuseer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/appuser \
  && chmod 0440 /etc/sudoers.d/appuser
USER appuser
CMD ["npm", "run", "start"]

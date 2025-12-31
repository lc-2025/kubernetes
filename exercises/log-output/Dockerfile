FROM node:22-alpine
WORKDIR /usr/src/app
COPY . .
RUN adduser -D appuser \
  && mkdir -p /etc/sudoers.d \
  && echo "appuseer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/appuser \
  && chmod 0440 /etc/sudoers.d/appuser
USER appuser
CMD ["node", "index.js"]

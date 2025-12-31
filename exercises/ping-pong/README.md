# Ping Pong

Ping Pong web application.

## API Documentation (REST)

- Root
  - Endpoint: `/` (redirects to `/pingpong` - GKE only)
  - Response: `200`
  - Description: Verifies the service status

- Status
  - Endpoint: `/pingpong`
  - Response: `200`
  - Description: Returns the full output

- Status
  - Endpoint: `/pings`
  - Response: `200`
  - Description: Returns the amount of endpoint calls performed

## Getting started

On terminal, from project root:

- To install dependencies

```bash
  npm i
```

- To lint the sources

```bash
  npm run lint
```

- To run in `development` mode

```bash
  npm run dev
```

- To build the production version

```bash
  npm run build
```

- To run in `production` mode

```bash
  npm run start
```

### Using Docker

You may use Docker to build the container and run the image.

On terminal, from project root:

Build the image and run the container

```bash
docker compose up
```

Stop the container

```bash
docker compose stop
```

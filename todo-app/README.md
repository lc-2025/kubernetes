# TODO App

A TODO manager web application.

[![Release application TODO](https://github.com/lc-2025/kubernetes/actions/workflows/todo.yaml/badge.svg)](https://github.com/lc-2025/kubernetes/actions/workflows/todo.yaml)

## API Documentation (REST)

- Root
  - Endpoint: `/`
  - Response: `200`
  - Description: Verifies the service status

- `GET` todos
  - Endpoint: `/todos`
  - Response: `200` | `400` | `409`
  - Description: Returns the current TODOs

- `POST` todos
  - Endpoint: `/todos`
  - Response: `200` | `400` | `409`
  - Description: Saves the new TODO

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

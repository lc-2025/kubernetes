# Log Output

Prints a random hash every 5 seconds.

## API Documentation (REST)

- Root
  - Endpoint: `/`
  - Response: `200`
  - Description: Returns the output including hash and endpoint calls

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

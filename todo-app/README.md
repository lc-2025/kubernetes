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

## DBaaS vs DIY

### DBaaS approach

- Initialization
  - Rely on a set of instances - single or clustered - for different needs, usually pre-configured by the provider and initially scaled by environment (such as GCloud SQL), as SQL or NoSQL solutions
- Usage
  - Most of the usual actions are assisted by the infrastructure or even automated, such as migrations. Ideally, switching from a PV to the DBaaS - particularly in GCloud - expects to dump an existing DB - DIY solution - and import it into the new instance. Parallel services like Cloud Storage may be involved as a "temporary" solution to store the dump file. A dedicated container run as a proxy will be deployed to provide the Cloud instance access to the application
- Backup
- Maintenance
  - Performed by the infrastructure provider in large part
- PROs
  - High efficiency in terms of maintainability, such as monitoring, optimizations, scaling, checks, security and so on
  - Reduced implementation/configuration time/resources effort
- CONs
  - Higher costs compared to a DIY solution, as a drawback of many automated aspects
  - Out of the box configs/settings might not always fit the project specifications and require some tweaking

### DIY approach

- Initialization
  - Rely on a side Docker container instance - i.e. PostgreSQL - as a database service, running in a dedicated container
  - Provide a Persistent Volume to store the database data
  - Make the DB instance accessible to other containers via a headless service
  - Integrate the communication between the application container and the DB service through a stateful set, where the Persistent Volume Claim is being requested to mount the expected storage
- Usage
  - The application performs CRUD actions via REST API calls initialized by the user, where the DB is responsible for reading and storing data to the Persistent Volume as response
- Backup
  - DB backups may be executed on demand via a Job resource or scheduled over time through a CronJob one
- Maintenance
- PROs
  - Fully customizable and configurable according to the specifications
- CONs
  - May require high time and resources, such as status checks, optimizations, updates/upgrades, scaling, and so on

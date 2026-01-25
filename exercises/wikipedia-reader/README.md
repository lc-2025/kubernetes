# Wikipedia Reader

Serves Wikipedia pages with dynamic content fetching. The application fetches the Kubernetes Wikipedia page at startup and continuously fetches random Wikipedia pages at intervals.

## API Documentation (REST)

- Root
  - Endpoint: `/`
  - Response: `200`
  - Description: Server is running

- Health
  - Endpoint: `/health`
  - Response: `200`
  - Description: Server health status

- Ready
  - Endpoint: `/ready`
  - Response: `200`
  - Description: Server readiness status

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

- To run init container

```bash
  npm run init-container
```

- To run sidecar container

```bash
  npm run sidecar
```

### Using Docker

You may use Docker to build the container and run the image.

On terminal, from project root:

- To build the server image

```bash
  docker build -t wikipedia-reader:latest .
```

- To build the init container image

```bash
  docker build -f Dockerfile.init -t wikipedia-reader-init:latest .
```

- To build the sidecar container image

```bash
  docker build -f Dockerfile.sidecar -t wikipedia-reader-sidecar:latest .
```

- To build the nginx image

```bash
  docker build -f Dockerfile.nginx -t wikipedia-reader-nginx:latest .
```

- To run using docker-compose (development)

```bash
  docker-compose up --build
```

- To run using docker-compose (production)

```bash
  docker-compose -f docker-compose.server.yaml up --build
```

- To stop docker-compose

```bash
  docker-compose down
```

### Using Kubernetes

You may deploy the application to Kubernetes using manifests.

#### Prerequisites

- Kubernetes cluster with `exercises` namespace
- Docker images pushed to registry:
  - `thespeaker33/wikipedia-reader:latest`
  - `thespeaker33/wikipedia-reader-init:latest`
  - `thespeaker33/wikipedia-reader-sidecar:latest`
  - `nginx:alpine` (public)

#### Deploy basic version

```bash
  kubectl apply -k manifests/
```

#### Deploy with Istio

```bash
  kubectl apply -k manifests/istio/
```

#### Verify deployment

```bash
  # Check pods
  kubectl get pods -n exercises -l app=wikipedia-reader

  # Check services
  kubectl get svc -n exercises -l app=wikipedia-reader

  # View logs
  kubectl logs -n exercises -l app=wikipedia-reader -c init-container
  kubectl logs -n exercises -l app=wikipedia-reader -c sidecar -f
  kubectl logs -n exercises -l app=wikipedia-reader -c nginx

  # Port-forward
  kubectl port-forward -n exercises svc/wikipedia-reader 8080:80
```

## Architecture

### Containers

The application uses three container images:

1. **Init Container** (`Dockerfile.init`)
   - Runs once at pod startup
   - Fetches the Kubernetes Wikipedia page
   - Saves to `/data/www/kubernetes.html`
   - Exits after completion

2. **Sidecar Container** (`Dockerfile.sidecar`)
   - Runs continuously alongside nginx
   - Fetches random Wikipedia pages every 5-15 minutes
   - Saves to `/data/www/page.html` (overwrites previous)
   - Logs errors but continues running

3. **Main Container (nginx)**
   - Serves static files from `/data/www`
   - Port: 80
   - Immutable access to shared volume

### Shared Volume

- **Type**: `emptyDir`
- **Lifetime**: Pod lifetime (deleted on pod termination)
- **Path**: `/data/www`
- **Purpose**: Enables data sharing between init, sidecar, and nginx containers

## Configuration

Configuration is managed via Kubernetes ConfigMap: `wikipedia-reader-config`

Environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `SHARED_VOLUME` | `/data/www` | Shared volume mount path |
| `RANDOM_MIN_SECONDS` | `300` | Min wait between random fetches (5 min) |
| `RANDOM_MAX_SECONDS` | `900` | Max wait between random fetches (15 min) |

### Development Configuration

In `docker-compose.yaml`, timings are reduced for testing:

- `RANDOM_MIN_SECONDS: 30`
- `RANDOM_MAX_SECONDS: 60`

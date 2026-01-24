# DummySite

A Kubernetes operator controller that watches for DummySite custom resources and automatically creates Deployments, Services, and ConfigMaps to serve website content fetched from URLs.

## Features

- Custom Resource Definition (CRD) support for DummySite resources
- Automatic website content fetching via HTTP
- ConfigMap-based content distribution
- Nginx-based web server deployment
- ClusterIP service exposure
- Automatic resource cleanup via owner references

## API Documentation (Kubernetes CRD)

- DummySite Resource
  - Group: `stable.dwk`
  - Version: `v1`
  - Kind: `DummySite`
  - Description: Custom resource for creating web servers from URLs

### DummySite Spec

```yaml
apiVersion: stable.dwk/v1
kind: DummySite
metadata:
  name: example
  namespace: default
spec:
  website_url: "https://example.com"
  image: "nginx:latest"
```

### Generated Resources

For each DummySite resource, the controller creates:

- **ConfigMap** (`{name}-content`): Stores fetched HTML content
- **Deployment** (`{name}-deployment`): Runs nginx with 1 replica
- **Service** (`{name}-service`): ClusterIP service on port 80

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

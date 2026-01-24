# DevOps with Kubernetes

University of Helsinki course exercises

## Getting Started

For any maintanance and/or trial needs, please refer to the following specifications and side-ones:

- [Course examples](./examples/README.md)
- [Course exercises](./backend/README.md)
- [Libraries](./lib/README.md)
- [Course project](./project/todo-app/README.md)

## Repository

The archive reflects a monolithic setting - monorepo - using _NPM Workspaces_ to organize all the related projects.
Workspaces may be globally managed accordingly to the following specifications.

## Setting Up

On terminal, from project root:

- To install dependencies for all the workspaces:

```bash
npm run setup
```

- To install dependencies in Continous-Integration mode for all the workspaces:

```bash
npm run setup:ci
```

- To lint the sources of all the workspaces:

```bash
npm run lint
```

- To build the production version of all the workspaces:

```bash
npm run build
```

## Exercises

### Chapter 2

- [1.1](https://github.com/lc-2025/kubernetes/tree/1.1/log-output)
- [1.2](https://github.com/lc-2025/kubernetes/tree/1.2/todo-app)
- [1.3](https://github.com/lc-2025/kubernetes/tree/1.3/log-output)
- [1.4](https://github.com/lc-2025/kubernetes/tree/1.4/todo-app)
- [1.5](https://github.com/lc-2025/kubernetes/tree/1.5/todo-app)
- [1.6](https://github.com/lc-2025/kubernetes/tree/1.6/todo-app)
- [1.7](https://github.com/lc-2025/kubernetes/tree/1.7/log-output)
- [1.8](https://github.com/lc-2025/kubernetes/tree/1.8/todo-app)
- [1.9](https://github.com/lc-2025/kubernetes/tree/1.9/ping-pong)
- [1.10](https://github.com/lc-2025/kubernetes/tree/1.10/log-output)
- [1.11](https://github.com/lc-2025/kubernetes/tree/1.11/manifests)
- [1.12](https://github.com/lc-2025/kubernetes/tree/1.12/todo-app)
- [1.13](https://github.com/lc-2025/kubernetes/tree/1.13/todo-app)

### Chapter 3

- [2.1](https://github.com/lc-2025/kubernetes/tree/2.1/log-output)
- [2.2](https://github.com/lc-2025/kubernetes/tree/2.2/todo-app)
- [2.3](https://github.com/lc-2025/kubernetes/tree/2.3)
- [2.4](https://github.com/lc-2025/kubernetes/tree/2.4/todo-app)
- [2.5](https://github.com/lc-2025/kubernetes/tree/2.5/log-output)
- [2.6](https://github.com/lc-2025/kubernetes/tree/2.6/todo-app)
- [2.7](https://github.com/lc-2025/kubernetes/tree/2.7/ping-pong)
- [2.8](https://github.com/lc-2025/kubernetes/tree/2.8/todo-app)
- [2.9](https://github.com/lc-2025/kubernetes/tree/2.9/todo-app)
- [2.10](https://github.com/lc-2025/kubernetes/tree/2.10/todo-app)

### Chapter 4

- [3.1](https://github.com/lc-2025/kubernetes/tree/3.1/ping-pong)
- [3.2](https://github.com/lc-2025/kubernetes/tree/3.2)
- [3.3](https://github.com/lc-2025/kubernetes/tree/3.3/todo)
- [3.4](https://github.com/lc-2025/kubernetes/tree/3.4/ping-pong)
- [3.5](https://github.com/lc-2025/kubernetes/tree/3.5/todo-app)
- [3.6](https://github.com/lc-2025/kubernetes/tree/3.6/todo-app)
- [3.7](https://github.com/lc-2025/kubernetes/tree/3.7/todo-app)
- [3.8](https://github.com/lc-2025/kubernetes/tree/3.8/todo-app)
- [3.9](https://github.com/lc-2025/kubernetes/tree/3.9/todo-app)
- [3.10](https://github.com/lc-2025/kubernetes/tree/3.10/todo-app)
- [3.11](https://github.com/lc-2025/kubernetes/tree/3.11/todo-app)
- [3.12](https://github.com/lc-2025/kubernetes/tree/3.12/todo-app)

### Chapter 5

- [4.1](https://github.com/lc-2025/kubernetes/tree/4.1)
- [4.2](https://github.com/lc-2025/kubernetes/tree/4.2/todo-app)
- [4.3](https://github.com/lc-2025/kubernetes/tree/4.3)
- [4.4](https://github.com/lc-2025/kubernetes/tree/4.4/ping-pong)

#### Prometheus

- Show the number of Pods created by `StatefulSet`:

```bash
sum(kube_pod_info{created_by_kind="StatefulSet"})
```

- [4.5](https://github.com/lc-2025/kubernetes/tree/4.5/todo-app)
- [4.6](https://github.com/lc-2025/kubernetes/tree/4.6/todo-app)
- [4.7](https://github.com/lc-2025/kubernetes/tree/v4.7/exercises/log-output)
- [4.8](https://github.com/lc-2025/kubernetes/tree/v4.8/project/todo-app)
- [4.9](https://github.com/lc-2025/kubernetes/tree/4.9/project/todo-app)
- [4.10](https://github.com/lc-2025/kubernetes/tree/4.10/project/todo-app)

### Chapter 6

- [5.1](https://github.com/lc-2025/kubernetes/tree/5.1/exercises/dummy-site)

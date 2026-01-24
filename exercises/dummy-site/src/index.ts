import * as k8s from '@kubernetes/client-node';
import axios from 'axios';
import {
  GROUP,
  VERSION,
  PLURAL,
  MAX_CONTENT_SIZE,
  HEADERS,
  RECONNECTION,
  TIMEOUT,
  RESOURCE_SUFFIXES,
  CONTAINER_CONFIG,
  API_CONFIG,
} from './utils/constants';
import {
  patchOrCreate,
  buildResourceName,
  createOwnerReference,
  formatResourceLocation,
  extractDummySiteMetadata,
} from './utils/utilities';
import logger from 'dwk-logger';

const kc = new k8s.KubeConfig();

kc.loadFromCluster();

const appsApi = kc.makeApiClient(k8s.AppsV1Api);
const coreApi = kc.makeApiClient(k8s.CoreV1Api);

/**
 * @description URL fetcher
 * @author Luca Cattide
 * @date 24/01/2026
 * @param {string} url
 * @returns {*}  {Promise<string>}
 */
const fetchUrl = async (url: string): Promise<string | undefined> => {
  try {
    logger.info(`Fetching website from: ${url}`);

    const response = await axios.get(url, {
      timeout: TIMEOUT,
      maxContentLength: MAX_CONTENT_SIZE,
      headers: HEADERS.FETCH,
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch ${url}}`);
    }

    return response.data;
  } catch (error) {
    logger.error(`Error fetching URL ${url}`);
  }
};

/**
 * @description ConfigMap setter
 * @author Luca Cattide
 * @date 24/01/2026
 * @param {string} namespace
 * @param {string} name
 * @param {string} content
 * @param {any[]} ownerReferences
 * @returns {*}  {Promise<void>}
 */
const setConfigMap = async (
  namespace: string,
  name: string,
  content: string,
  ownerReferences: any[],
): Promise<void> => {
  const configMapName = buildResourceName(name, RESOURCE_SUFFIXES.CONTENT);
  const location = formatResourceLocation(namespace, configMapName);
  const configMap: k8s.V1ConfigMap = {
    apiVersion: 'v1',
    kind: 'ConfigMap',
    metadata: {
      name: configMapName,
      namespace,
      ownerReferences,
    },
    data: {
      [CONTAINER_CONFIG.HTML_FILE]: content,
    },
  };

  await patchOrCreate(
    () => coreApi.readNamespacedConfigMap({ name: configMapName, namespace } as any),
    () =>
      coreApi.patchNamespacedConfigMap({
        name: configMapName,
        namespace,
        body: configMap,
        headers: HEADERS.SET,
      } as any),
    () => coreApi.createNamespacedConfigMap({ namespace, body: configMap } as any),
    `ConfigMap ${location}`
  );
};

/**
 * @description Deployment setter
 * @author Luca Cattide
 * @date 24/01/2026
 * @param {string} namespace
 * @param {string} name
 * @param {string} image
 * @param {any[]} ownerReferences
 * @returns {*}  {Promise<void>}
 */
const setDeployment = async (
  namespace: string,
  name: string,
  image: string,
  ownerReferences: any[],
): Promise<void> => {
  const deploymentName = buildResourceName(name, RESOURCE_SUFFIXES.DEPLOYMENT);
  const configMapName = buildResourceName(name, RESOURCE_SUFFIXES.CONTENT);
  const location = formatResourceLocation(namespace, deploymentName);
  const deployment: k8s.V1Deployment = {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata: {
      name: deploymentName,
      namespace,
      ownerReferences,
    },
    spec: {
      replicas: CONTAINER_CONFIG.REPLICAS,
      selector: {
        matchLabels: {
          app: name,
        },
      },
      template: {
        metadata: {
          labels: {
            app: name,
          },
        },
        spec: {
          containers: [
            {
              name: CONTAINER_CONFIG.NAME,
              image,
              ports: [{ containerPort: CONTAINER_CONFIG.PORT }],
              volumeMounts: [
                {
                  name: CONTAINER_CONFIG.VOLUME_NAME,
                  mountPath: CONTAINER_CONFIG.MOUNT_PATH,
                },
              ],
            },
          ],
          volumes: [
            {
              name: CONTAINER_CONFIG.VOLUME_NAME,
              configMap: {
                name: configMapName,
              },
            },
          ],
        },
      },
    },
  };

  await patchOrCreate(
    () => appsApi.readNamespacedDeployment({ name: deploymentName, namespace } as any),
    () =>
      appsApi.patchNamespacedDeployment({
        name: deploymentName,
        namespace,
        body: deployment,
        headers: HEADERS.SET,
      } as any),
    () => appsApi.createNamespacedDeployment({ namespace, body: deployment } as any),
    `Deployment ${location}`
  );
};

/**
 * @description Service setter
 * @author Luca Cattide
 * @date 24/01/2026
 * @param {string} namespace
 * @param {string} name
 * @param {any[]} ownerReferences
 * @returns {*}  {Promise<void>}
 */
const setService = async (
  namespace: string,
  name: string,
  ownerReferences: any[],
): Promise<void> => {
  const serviceName = buildResourceName(name, RESOURCE_SUFFIXES.SERVICE);
  const location = formatResourceLocation(namespace, serviceName);
  const service: k8s.V1Service = {
    apiVersion: 'v1',
    kind: 'Service',
    metadata: {
      name: serviceName,
      namespace,
      ownerReferences,
    },
    spec: {
      type: 'ClusterIP',
      selector: {
        app: name,
      },
      ports: [
        {
          protocol: 'TCP',
          port: CONTAINER_CONFIG.SERVICE_PORT,
          targetPort: CONTAINER_CONFIG.PORT,
        },
      ],
    },
  };

  await patchOrCreate(
    () => coreApi.readNamespacedService({ name: serviceName, namespace } as any),
    () =>
      coreApi.patchNamespacedService({
        name: serviceName,
        namespace,
        body: service,
        headers: HEADERS.SET,
      } as any),
    () => coreApi.createNamespacedService({ namespace, body: service } as any),
    `Service ${location}`
  );
};

/**
 * @description Dummy Site creation handler
 * @author Luca Cattide
 * @date 24/01/2026
 * @param {*} dummySite
 * @returns {*}  {Promise<void>}
 */
const handleDummySiteAdded = async (dummySite: any): Promise<void> => {
  const { name, namespace, url, image } = extractDummySiteMetadata(dummySite);
  const location = formatResourceLocation(namespace, name);

  logger.info(`\n[ADDED] DummySite: ${location}`);
  logger.info(`Website URL: ${url}`);

  try {
    const content = await fetchUrl(url);

    if (!content) {
      throw new Error('Failed to fetch website content');
    }

    logger.info(`Successfully fetched ${content.length} bytes from ${url}`);

    // Owner reference for garbage collection
    const ownerReferences = createOwnerReference(
      name,
      dummySite.metadata.uid,
      API_CONFIG.OWNER_REF_VERSION
    );

    await setConfigMap(namespace, name, content, ownerReferences);
    await setDeployment(namespace, name, image, ownerReferences);
    await setService(namespace, name, ownerReferences);

    logger.info(
      `✓ Successfully created all resources for DummySite ${location}\n`,
    );
  } catch (error) {
    logger.error(`✗ Error processing DummySite ${location}:`, error);
  }
};

/**
 * @description Dummy site deletion handler
 * @author Luca Cattide
 * @date 24/01/2026
 * @param {*} dummySite
 * @returns {*}  {Promise<void>}
 */
const handleDummySiteDeleted = async (dummySite: any): Promise<void> => {
  const { name, namespace } = extractDummySiteMetadata(dummySite);
  const location = formatResourceLocation(namespace, name);

  logger.info(
    `\n[DELETED] DummySite: ${location}\nResources will be automatically cleaned up by Kubernetes due to owner references\n`,
  );
};

/**
 * @description Dummy site watcher
 * @author Luca Cattide
 * @date 24/01/2026
 * @returns {*}  {Promise<void>}
 */
const watchDummySites = async (): Promise<void> => {
  try {
    logger.info(
      `Starting DummySite controller...\nWatching for ${GROUP}/${VERSION}/${PLURAL} resources\n`,
    );

    const watcher = new k8s.Watch(kc);

    await watcher.watch(
      API_CONFIG.WATCH_PATH,
      {},
      async (type: string, apiObj: any) => {
        try {
          const action = {
            ['ADDED']: await handleDummySiteAdded(apiObj),
            ['DELETED']: await handleDummySiteDeleted(apiObj),
            ['MODIFIED']: logger.info(
              `[MODIFIED] DummySite: ${formatResourceLocation(apiObj.metadata.namespace, apiObj.metadata.name)}`,
            ),
          };

          action[type as keyof typeof action];
        } catch (error) {
          logger.error('Error in watch callback:', error);
        }
      },
      (error: any) => {
        if (error) {
          logger.error('Watch error:', error);
          setTimeout(watchDummySites, RECONNECTION);
        }
      },
    );
  } catch (error) {
    logger.error('Failed to start watcher:', error);
    setTimeout(watchDummySites, RECONNECTION);
  }
};

watchDummySites().catch((error) => {
  logger.error('Fatal error:', error);
  process.exit(1);
});
// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

import logger from 'dwk-logger';

/**
 * @description Patches or create operation helper
 * @author Luca Cattide
 * @date 24/01/2026
 * @export
 * @param {() => Promise<any>} readFn
 * @param {() => Promise<any>} patchFn
 * @param {() => Promise<any>} createFn
 * @param {string} resourceName
 * @returns {*}  {Promise<void>}
 */
export const patchOrCreate = async (
  readFn: () => Promise<any>,
  patchFn: () => Promise<any>,
  createFn: () => Promise<any>,
  resourceName: string
): Promise<void> => {
  try {
    await readFn();
    await patchFn();

    logger.info(`${resourceName} updated`);
  } catch (error: any) {
    if (error.response?.status === 404) {
      await createFn();

      logger.info(`${resourceName} created`);
    } else {
      logger.error(`Error operating on ${resourceName}`);
    }
  }
};

/**
 * @description Build resource name with suffix
 * @author Luca Cattide
 * @date 24/01/2026
 * @export
 * @param {string} name
 * @param {string} suffix
 * @returns {*}  {string}
 */
export const buildResourceName = (name: string, suffix: string): string =>
  `${name}${suffix}`;

/**
 * @description Creates owner reference for garbage collection
 * @author Luca Cattide
 * @date 24/01/2026
 * @export
 * @param {string} name
 * @param {string} uid
 * @param {string} apiVersion
 * @returns {*}  {any[]}
 */
export const createOwnerReference = (
  name: string,
  uid: string,
  apiVersion: string
): any[] => [
  {
    apiVersion,
    kind: 'DummySite',
    name,
    uid,
    controller: true,
    blockOwnerDeletion: true,
  },
];

/**
 * @description Formats resource location for logging
 * @author Luca Cattide
 * @date 24/01/2026
 * @export
 * @param {string} namespace
 * @param {string} name
 * @returns {*}  {string}
 */
export const formatResourceLocation = (namespace: string, name: string): string =>
  `${namespace}/${name}`;

/**
 * @description Extracts metadata from DummySite resource
 * @author Luca Cattide
 * @date 24/01/2026
 * @export
 * @param {*} dummySite
 * @returns {*}  {{
 *   name: string;
 *   namespace: string;
 *   url: string;
 *   image: string;
 * }}
 */
export const extractDummySiteMetadata = (dummySite: any): {
  name: string;
  namespace: string;
  url: string;
  image: string;
} => {
  const { name, namespace } = dummySite.metadata;
  const { website_url, image } = dummySite.spec;

  return { name, namespace, url: website_url, image };
};

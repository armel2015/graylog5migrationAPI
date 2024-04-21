import logger from '../utils/logger.js';

export function isNullOrUndefinedOrEmpty (value) {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === 'string' && value.length === 0) {
    return true;
  }
  return false;
}

export function createMapPrefixIndexId (destinationPrefixIdObject, currentIndexSetsToImport) {
  for (const indexSet of currentIndexSetsToImport) {
    destinationPrefixIdObject[indexSet.index_prefix] = indexSet.id;
  }
  return destinationPrefixIdObject;
}

export function createMapIdPrefixIndex (fromPrefixIdObject, fromtIndexSetsToImport) {
  for (const indexSet of fromtIndexSetsToImport) {
    fromPrefixIdObject[indexSet.id] = indexSet.index_prefix;
  }
  return fromPrefixIdObject;
}

export async function createMapNotifIdTitle (
  origineNotifIdTitleObject,
  origineNotificationToImport
) {
  for (const notif of origineNotificationToImport) {
    origineNotifIdTitleObject[notif.id] = notif.title;
  }
  return origineNotifIdTitleObject;
}

export async function createMapNotifTitleId (
  destinationNotifTitleIdObject,
  destinationNotificationToImport) {
  for (const notif of destinationNotificationToImport) {
    destinationNotifTitleIdObject[notif.title] = notif.id;
  }
  return destinationNotifTitleIdObject;
}

export async function createMapStreamTitleId (
  destinationStreamTitleIdObject,
  destinationStreamToImport) {
  for (const streamObj of destinationStreamToImport) {
    destinationStreamTitleIdObject[streamObj.title] = streamObj.id;
  }
  return destinationStreamTitleIdObject;
}

export async function createMapStreamIdTitle (
  destinationStreamIdTitleObject,
  destinationStreamToImport) {
  for (const streamObj of destinationStreamToImport) {
    destinationStreamIdTitleObject[streamObj.id] = streamObj.title;
  }
  return destinationStreamIdTitleObject;
}

export function displayObjectToUpdate (data) {
  logger.info(`payload to update: ${data} \n`);
}

export function displayObjectToCreate (data) {
  logger.info(`payload to create: ${data} \n`);
}

export function containsStreams (permissions) {
  return permissions.some(permission => permission.includes('streams'));
}

export async function extractStreams (permissions) {
  const streamPermissionArray = [];
  permissions.forEach(entry => {
    if (entry.includes('streams')) {
      streamPermissionArray.push(entry);
    }
  });
  return streamPermissionArray;
}

export async function converterStreamId(streamPermissions, origineStreamIdTitleObject, destinationStreamTitleIdObject) {
  const resultListArray = [];
  for (const entry of streamPermissions) {
    const splitedArray = await entry.split(':');
    logger.info(`1-splitedArray: ${splitedArray}`);
    const origineId = splitedArray[2];
    logger.info(`2-origineId: ${origineId}`);
    const streamTitle = await origineStreamIdTitleObject[origineId];
    logger.info(`3-streamTitle: ${streamTitle}`);
    const streamIdDest = await destinationStreamTitleIdObject[streamTitle];
    logger.info(`3-streamIdDest: ${streamIdDest}`);
    const entryReplace = entry.replace(origineId, streamIdDest);
    logger.info(`4-entryReplace: ${entryReplace}`);
    resultListArray.push(entryReplace);
  }
  // logger.info(`5-resultListArray: ${resultListArray}`);
  return resultListArray;
}

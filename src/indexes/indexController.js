import { getIndexSets, getIndexSetsFromDestination, updateIndexSet, postIndexSet } from '../services/graylogService.js';
import { displayObjectToUpdate, displayObjectToCreate } from '../utils/utilities.js';
import { mapIndexSetObjectToUpdateDto, mapIndexSetObjectToDto } from '../utils/mapper.js';
import logger from '../utils/logger.js';

export async function transfertIndexSetConf () {
  // Retrieve and parse all indexsets from origin path
  const indexSets = await getIndexSets();
  const indexSetsParsed = await JSON.parse(indexSets);
  const numberOfIndexSetsToImport = indexSetsParsed['index_sets'].length;
  logger.info('Number of indexSets to import or update:', numberOfIndexSetsToImport);
  const indexSetsToImport = indexSetsParsed['index_sets'];

  logger.info('*****START OF INDEX_SETS CONFIGURATION TRANSFERT***** \n');

  // if indexset are include in the default one [graylog, gl-events, gl-system-events] we must just update instead of create
  const currentIndexSets = await getIndexSetsFromDestination();
  // first get all default dest indexset and retrieve only index_prefix and id to update
  const currentIndexSetsParsed = await JSON.parse(currentIndexSets);
  const currentIndexSetsToImport = currentIndexSetsParsed['index_sets'];
  // prefixIdObject must contains {graylog:idx, gl-events:idy, gl-system-events:idz}
  const prefixIdObject = {};
  for (const indexSet of currentIndexSetsToImport) {
    prefixIdObject[indexSet.index_prefix] = indexSet.id;
  }
  const prefixIdObjectParsed = JSON.stringify(prefixIdObject, null, 2);
  logger.info(`prefixIdObject: ${prefixIdObjectParsed}`);
  for (const indexSet of indexSetsToImport) {
    if (indexSet.index_prefix === 'graylog') {
      const indexSetGraylogObjetToUpdate = await mapIndexSetObjectToUpdateDto(indexSet);
      const indexSetObjectParsedDto = JSON.stringify(indexSetGraylogObjetToUpdate, null, 2);
      displayObjectToUpdate(indexSetObjectParsedDto);
      const id = prefixIdObject['graylog'];
      updateIndexSet(
        id,
        indexSetObjectParsedDto
      );
    } else if (indexSet.index_prefix === 'gl-events') {
      const indexSetGraylogObjetToUpdate = await mapIndexSetObjectToUpdateDto(indexSet);
      const indexSetObjectParsedDto = JSON.stringify(indexSetGraylogObjetToUpdate, null, 2);
      displayObjectToUpdate(indexSetObjectParsedDto);
      const indexSetId = prefixIdObject['gl-events'];
      updateIndexSet(
        indexSetId,
        indexSetObjectParsedDto
      );
    } else if (indexSet.index_prefix === 'gl-system-events') {
      const indexSetGraylogObjetToUpdate = await mapIndexSetObjectToUpdateDto(indexSet);
      const indexSetObjectParsedDto = JSON.stringify(indexSetGraylogObjetToUpdate, null, 2);
      displayObjectToUpdate(indexSetObjectParsedDto);
      const indexSetId = prefixIdObject['gl-system-events'];
      updateIndexSet(
        indexSetId,
        indexSetObjectParsedDto
      );
    } else {
      const indexSetObject = await mapIndexSetObjectToDto(indexSet);
      const indexSetObjectParsedDto = JSON.stringify(indexSetObject, null, 2);
      displayObjectToCreate(indexSetObjectParsedDto);
      postIndexSet(indexSetObjectParsedDto);
    }
  }
  return '*****END OF INDEX_SETS CONFIGURATION TRANSFERT******* \n';
};

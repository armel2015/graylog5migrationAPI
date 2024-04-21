import { getStreams, getIndexSetsFromDestination, getIndexSets, postStream } from '../services/graylogService.js';
import { createMapIdPrefixIndex, createMapPrefixIndexId, displayObjectToCreate } from '../utils/utilities.js';
import { mapRuleToDto, mapStreamObjectToDto } from '../utils/mapper.js';
import logger from '../utils/logger.js';

export async function transfertStreamsConf () {
  const streams = await getStreams();
  const streamsParsed = await JSON.parse(streams);
  const numberOfStreamToImport = streamsParsed['streams'].length;
  logger.info('Number of streams to import:', numberOfStreamToImport);
  const streamsToImport = streamsParsed['streams'];

  logger.info('*****START OF STREAMS CONFIGURATION TRANSFERT***** \n');

  // create destination index map exemple {graylog:1, gl-events:2, gl-system-events:3}
  const destinationIndexSets = await getIndexSetsFromDestination();
  const destinationIndexSetsParsed = await JSON.parse(destinationIndexSets);
  const destinationIndexSetsParsedObject = destinationIndexSetsParsed['index_sets'];
  let destinationPrefixIdObject = {};
  destinationPrefixIdObject = createMapPrefixIndexId(
    destinationPrefixIdObject,
    destinationIndexSetsParsedObject
  );
  logger.info(
    `destinationPrefixIdObject: ${JSON.stringify(destinationPrefixIdObject)}`
  );

  // create origin index map expemple {4:graylog, 5:gl-events, 6:gl-system-events}
  const origineIndexSets = await getIndexSets();
  const originetIndexSetsParsed = await JSON.parse(origineIndexSets);
  const originetIndexSetsToImport = originetIndexSetsParsed['index_sets'];
  let originePrefixIdObject = {};
  originePrefixIdObject = createMapIdPrefixIndex(
    originePrefixIdObject,
    originetIndexSetsToImport
  );
  logger.info(`originePrefixIdObject: ${JSON.stringify(originePrefixIdObject)}`);

  const baseStreams = ['All events', 'All messages', 'All system events'];
  for (const stream of streamsToImport) {
    if (baseStreams.includes(stream.title)) {
      // do not create default streams which already exist we a default Id
      continue;
    }

    // map origin index_set_id to destination index_set_id for the current stream
    const origineId = stream.index_set_id;
    const origineIdValue = originePrefixIdObject[origineId];
    const destinationId = destinationPrefixIdObject[origineIdValue];

    // create the rules array of the current stream
    const originRules = stream['rules'];
    const destinationRules = [];
    for (const rule of originRules) {
      const ruletoCreate = await mapRuleToDto(rule);
      destinationRules.push(ruletoCreate);
    }
    const streamObjectToCreate = await mapStreamObjectToDto(destinationId, stream, destinationRules);
    const streamObjectToCreateParsedDto = JSON.stringify(streamObjectToCreate, null, 2);
    displayObjectToCreate(streamObjectToCreateParsedDto);
    postStream(streamObjectToCreateParsedDto);
  }
  return '*****END OF STREAMS CONFIGURATION TRANSFERT******* \n';
}

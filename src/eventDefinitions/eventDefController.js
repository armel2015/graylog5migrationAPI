import { postEventsDefinition, getEventsNotifications, getEventsDefinitions, getDestinationEventsNotifications, getStreams, getDestinationStreams } from '../services/graylogService.js';
import { displayObjectToCreate, createMapNotifIdTitle, createMapNotifTitleId, createMapStreamTitleId, createMapStreamIdTitle } from '../utils/utilities.js';
import { mapEventDefinitionsObjectToDto, mapNotificationObjForEvtDefinition } from '../utils/mapper.js';
import logger from '../utils/logger.js';

export async function transfertEventsDefinitionsConf () {
  const eventsDefinitions = await getEventsDefinitions();
  const eventsDefinitionsParsed = await JSON.parse(eventsDefinitions);
  const numberOfeventsDefinitionsToImport = eventsDefinitionsParsed['event_definitions'].length;
  logger.info('Number of event definitions to import:', numberOfeventsDefinitionsToImport);
  const eventsDefinitionsParsedToImport = eventsDefinitionsParsed['event_definitions'];

  logger.info('*****START OF EVENT DEFINITIONS CONFIGURATION TRANSFERT***** \n');

  // Create 2 maps objects for notification map1{title:id, title2:id2}: map2{id:title, id2:title}
  const origineNotification = await getEventsNotifications();
  const destinationNotification = await getDestinationEventsNotifications();

  const origineNotificationParsed = await JSON.parse(origineNotification);
  const origineNotificationToImport = origineNotificationParsed['notifications'];

  const destinationNotificationParsed = await JSON.parse(destinationNotification);
  const destinationNotificationToImport = destinationNotificationParsed['notifications'];

  let origineNotifIdTitleObject = {};
  origineNotifIdTitleObject = await createMapNotifIdTitle(
    origineNotifIdTitleObject,
    origineNotificationToImport
  );

  let destinationNotifTitleIdObject = {};
  destinationNotifTitleIdObject = await createMapNotifTitleId(
    destinationNotifTitleIdObject,
    destinationNotificationToImport
  );

  // Create 2 maps objects for stream map1{title:id, title2:id2}: map2{id:title, id2:title}
  const origineStreams = await getStreams();
  const destinationStreams = await getDestinationStreams();

  const origineStreamParsed = await JSON.parse(origineStreams);
  const origineStreamToImport = origineStreamParsed['streams'];

  const destinationStreamParsed = await JSON.parse(destinationStreams);
  const destinationStreamToImport = destinationStreamParsed['streams'];

  let origineStreamIdTitleObject = {};
  origineStreamIdTitleObject = await createMapStreamIdTitle(
    origineStreamIdTitleObject,
    origineStreamToImport
  );

  let destinationStreamTitleIdObject = {};
  destinationStreamTitleIdObject = await createMapStreamTitleId(
    destinationStreamTitleIdObject,
    destinationStreamToImport
  );

  for (const definition of eventsDefinitionsParsedToImport) {
    if (definition.id === null) {
      continue;
    }
    // Create a notifications ArrayList to push in eventDef object
    const currentNotifList = definition['notifications'];
    const finalNotifList = [];
    // loop currentNotifList and update notifId each time it appear then return finalNotifList
    for (const notif of currentNotifList) {
      if (notif.notification_id === null) {
        continue;
      }
      // Process the mapping ID
      const titleOfNotifId = await origineNotifIdTitleObject[notif.notification_id];
      const idOfNotifTitle = await destinationNotifTitleIdObject[titleOfNotifId];
      const notifObj = await mapNotificationObjForEvtDefinition(idOfNotifTitle, notif);
      finalNotifList.push(notifObj);
    }
    // Create a stream ************************** ArrayList
    logger.info(`definition: ${JSON.stringify(definition, null, 2)}`);
    let currentStreamsConfList = [];
    currentStreamsConfList = definition['config']['streams'];
    const finalStreamConfigList = [];
    // loop currentNotifList and update notifId each time it appear then return finalNotifList
    for (const streamId of currentStreamsConfList) {
      // Process the mapping ID
      const titleOfStreamId = await origineStreamIdTitleObject[streamId];
      const idOfStreamTitle = await destinationStreamTitleIdObject[titleOfStreamId];
      finalStreamConfigList.push(idOfStreamTitle);
    }
    const definitionsObject = await mapEventDefinitionsObjectToDto(finalNotifList, finalStreamConfigList, definition);
    const definitionsObjectToCreateParsedDto = JSON.stringify(definitionsObject, null, 2);
    displayObjectToCreate(definitionsObjectToCreateParsedDto);
    postEventsDefinition(definitionsObjectToCreateParsedDto);
  }
  return '*****END OF EVENT DEFINITIONS CONFIGURATION TRANSFERT******* \n';
};

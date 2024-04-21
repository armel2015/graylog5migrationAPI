import { getEventsNotifications, postEventsNotification } from '../services/graylogService.js';
import { displayObjectToCreate } from '../utils/utilities.js';
import { mapNotificationObjectToDto } from '../utils/mapper.js';
import logger from '../utils/logger.js';

export async function transfertEventsNotificationsConf () {
  const eventsNotifications = await getEventsNotifications();
  const eventsNotificationsParsed = await JSON.parse(eventsNotifications);
  const numberOfeventsNotificationsToImport = eventsNotificationsParsed['notifications'].length;
  logger.info('Number of notifications to import:', numberOfeventsNotificationsToImport);
  const eventsNotificationsParsedToImport = eventsNotificationsParsed['notifications'];

  logger.info('*****START OF EVENT NOTIFICATION CONFIGURATION TRANSFERT***** \n');

  for (const notification of eventsNotificationsParsedToImport) {
    if (notification.id === null) {
      continue;
    }
    const notificationsObject = await mapNotificationObjectToDto(notification);
    const notificationsObjectToCreateParsedDto = JSON.stringify(notificationsObject, null, 2);
    displayObjectToCreate(notificationsObjectToCreateParsedDto);
    postEventsNotification(notificationsObjectToCreateParsedDto);
  }
  return '*****END OF EVENT NOTIFICATION CONFIGURATION TRANSFERT******* \n';
};

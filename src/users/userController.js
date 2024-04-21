import { postUsers, getUsers, getStreams, getDestinationStreams, getUserByUsernameDest, putUserPermissions } from '../services/graylogService.js';
import { createMapStreamIdTitle, createMapStreamTitleId, extractStreams, containsStreams, converterStreamId } from '../utils/utilities.js';
import { mapUserObjDto } from '../utils/mapper.js';
import logger from '../utils/logger.js';

export const transfertUsersPermissionsConf = async function () {
  const users = await getUsers();
  const usersParsed = await JSON.parse(users);
  const usersCount = usersParsed['users'].length;
  logger.info('Number of uses to import:', usersCount);
  const usersToImport = usersParsed['users'];

  logger.info('*****START OF USERS  CONFIGURATION TRANSFERT***** \n');

  const origineStreams = await getStreams();
  const origineStreamParsed = await JSON.parse(origineStreams);
  const origineStreamToImport = origineStreamParsed['streams'];

  let origineStreamIdTitleObject = {};
  origineStreamIdTitleObject = await createMapStreamIdTitle(
    origineStreamIdTitleObject,
    origineStreamToImport
  );

  const destinationStreams = await getDestinationStreams();
  const destinationStreamParsed = await JSON.parse(destinationStreams);
  const destinationStreamToImport = destinationStreamParsed['streams'];

  let destinationStreamTitleIdObject = {};
  destinationStreamTitleIdObject = await createMapStreamTitleId(
    destinationStreamTitleIdObject,
    destinationStreamToImport
  );

  for (const user of usersToImport) {
    // const parsedOrigUser = JSON.stringify(user, null, 2);

    if (user.id === null) {
      continue;
    }
    // Create a notifications ArrayList to push in eventDef object
    const userName = user.username;

    const streamPermissions = await extractStreams(user['permissions']);
    const destUser = await getUserByUsernameDest(userName);
    if (streamPermissions.length !== 0) {
      if (destUser.isPresent === true) {
        logger.info(`Current user: ${userName}`);
        const parsedDestUser = await JSON.parse(destUser.data);

        // faire un foreach sur les permissions et vérifier si une entrée contient au moins le mot clé stream
        const hasStream = await containsStreams(parsedDestUser.permissions);
        logger.info(`check: ${hasStream}`);

        if (parsedDestUser.email === user.email && hasStream) {
        // Si cet utilisateur match avec l'email et si il n'as pas de stream dans les permissions alors
        // appeler l'API de mise à jour des permissions avec de ce user.
          logger.info(" this user already has stream permission in destination, skiped ");
        } else {
          logger.info(`${userName}: is present in origine and destination and dont have permission in destination`);
          const streamPermissionsConverted = await converterStreamId(streamPermissions, origineStreamIdTitleObject, destinationStreamTitleIdObject);
          logger.info(`streamPermissionsConverted: ${JSON.stringify(streamPermissionsConverted, null, 2)}`);
          putUserPermissions(userName, { permissions: streamPermissionsConverted });
          logger.info(`permission stream updated successfully for username: ${userName}`);
        }
      } else {
        logger.info(`error occure when retrieving username : ${userName} in graylog destination may be the user is not connected`);
        continue;
      }
    } else {
      logger.info(`no permission stream found for this user: ${userName}`);
      continue;
    }
  }
};

export const transfertUsersConf = async function () {
  const users = await getUsers();
  const usersParsed = await JSON.parse(users);
  const usersCount = usersParsed['users'].length;
  logger.info('Number of uses to import:', usersCount);
  const usersToImport = usersParsed['users'];

  for (const user of usersToImport) {
    const destUser = await getUserByUsernameDest(user.username);
    if (destUser.isPresent) {
      continue;
    } else {
      const userToCreate = await mapUserObjDto(user.email, user.username);
      postUsers(userToCreate);
    }
  }
};

import { getViews, postView } from '../services/graylogService.js';
import { displayObjectToCreate } from '../utils/utilities.js';
import { mapViewObjDto } from '../utils/mapper.js';
import logger from '../utils/logger.js';

export async function transfertViewsConf () {
  const views = await getViews();
  const viewsParsed = await JSON.parse(views);
  const numberOfViewsToImport = viewsParsed['views'].length;
  logger.info('Number of views to import:', numberOfViewsToImport);
  const viewsToImport = viewsParsed['views'];

  logger.info('*****START OF VIEWS CONFIGURATION TRANSFERT***** \n');

  for (const view of viewsToImport) {
    const viewObject = await mapViewObjDto(view);
    const viewObjectToCreateParsedDto = JSON.stringify(viewObject, null, 2);
    displayObjectToCreate(viewObjectToCreateParsedDto);
    postView(viewObjectToCreateParsedDto);
  }
  return '*****END OF VIEWS CONFIGURATION TRANSFERT******* \n';
}

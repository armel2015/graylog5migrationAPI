import { getInputs, postInput } from '../services/graylogService.js';
import { displayObjectToCreate } from '../utils/utilities.js';
import { mapInputObjectToDto } from '../utils/mapper.js';
import logger from '../utils/logger.js';

export async function transfertInputsConf () {
  const inputs = await getInputs();
  const inputsParsed = await JSON.parse(inputs);
  const numberOfInputsToImport = inputsParsed['inputs'].length;
  logger.info('Number of inputs to import:', numberOfInputsToImport);
  const inputsToImport = inputsParsed['inputs'];

  logger.info('*****START OF INPUTS CONFIGURATION TRANSFERT***** \n');

  for (const input of inputsToImport) {
    const inputObject = await mapInputObjectToDto(input);
    const inputObjectToCreateParsedDto = JSON.stringify(inputObject, null, 2);
    displayObjectToCreate(inputObjectToCreateParsedDto);
    postInput(inputObjectToCreateParsedDto);
  }
  return '*****END OF INPUTS CONFIGURATION TRANSFERT******* \n';
};

import axios from 'axios';
import config from '../config.js';
import https from 'https';
import logger from '../utils/logger.js';

// Create a custom agent with rejectUnauthorized set to false
const agent = new https.Agent({
  rejectUnauthorized: false
});

const httpOrigin = axios.create({
  baseURL: `${config.url.baseUrlFrom}`,
  headers: {
    Accept: 'application/json',
    Authorization: `${config.url.authorizationFrom}`,
    'Content-Type': 'application/json'
  }
});

const httpDestination = axios.create({
  httpsAgent: agent,
  baseURL: `${config.url.baseUrlTo}`,
  headers: {
    'X-Requested-By': 'localhost',
    Accept: 'application/json',
    Authorization: `${config.url.authorizationTo}`,
    'Content-Type': 'application/json'
  }
});

httpOrigin.interceptors.request.use(request => {
  // console.log('Starting Request', request.baseURL, JSON.stringify(request.headers));
  return request;
});

httpOrigin.interceptors.response.use(response => {
  // console.log('Response:', response);
  return response;
});

// ONLY FOR CRUD OPERATION

// INDEX_SETS
export const getIndexSetsFromDestination  = async function () {
  try {
    const response = await httpDestination.get('/system/indices/index_sets');
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error?.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const getIndexSets = async function () {
  try {
    const response = await httpOrigin.get('/system/indices/index_sets');
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error?.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const postIndexSet = async function (dataDto) {
  try {
    const response = await httpDestination.post('/system/indices/index_sets', dataDto);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error?.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const updateIndexSet = async function (indexId, dataDto) {
  try {
    const uriParam = `/system/indices/index_sets/${indexId}`;
    const response = await httpDestination.put(uriParam, dataDto);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error?.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

// INPUTS
export const getInputs = async function () {
  try {
    const response = await httpOrigin.get('/system/inputs');
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error?.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const postInput = async function (dataDto) {
  try {
    const response = await httpDestination.post('/system/inputs', dataDto);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error?.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};
// RULES
export const getRules = async function (streamid) {
  try {
    const urlParam = `/streams/${streamid}/rules`;
    const response = await httpOrigin.get(urlParam);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error?.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const postRule = async function (streamid, dataDto) {
  try {
    const urlParam = `/streams/${streamid}/rules`;
    const response = await httpOrigin.post(urlParam, dataDto);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error?.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

// STREAMS
export const getStreams = async function () {
  try {
    const response = await httpOrigin.get('/streams');
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const getDestinationStreams = async function () {
  try {
    const response = await httpDestination.get('/streams');
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const postStream = async function (dataDto) {
  try {
    const response = await httpDestination.post('/streams', dataDto);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error?.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

// EVENT NOTIFICATION
export const getEventsNotifications = async function () {
  try {
    const response = await httpOrigin.get('/events/notifications');
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const getDestinationEventsNotifications = async function () {
  try {
    const response = await httpDestination.get('/events/notifications');
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const postEventsNotification = async function (dataDto) {
  try {
    const response = await httpDestination.post('/events/notifications', dataDto);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};
// EVENT DEFINITION
export const getEventsDefinitions = async function () {
  try {
    const response = await httpOrigin.get('/events/definitions');
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const postEventsDefinition =  async function (dataDto) {
  try {
    const response = await httpDestination.post('/events/definitions', dataDto);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};
// SEARCH
export const getSearchs = async function () {
  try {
    const response = await httpOrigin.get('/views/search');
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const postSearch = async function (dataDto) {
  try {
    const response = await httpDestination.post('/views/search', dataDto);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

// VIEWS
export const getViews = async function () {
  try {
    const response = await httpOrigin.get('/views');
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const postView = async function (dataDto) {
  try {
    const response = await httpDestination.post('/views', dataDto);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

// DASHBOARDS
// this funtion should be async because it wait for a promise Get request
export const getDashboards = async function () {
  // as we can probably have an error, let'us first try catch the call
  try {
    // here the key word await define that the we are waiting for a promise from the request
    const response = await httpOrigin.get('/dashboards');
    // here we transform the javascript response value to javascript JSON Object
    const responseData = JSON.stringify(response?.data, null, 2);
    // we return the json object
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const getUsers = async function () {
  try {
    const response = await httpOrigin.get('/users');
    // here we transform the javascript response value to javascript JSON Object
    const responseData = JSON.stringify(response?.data, null, 2);
    // we return the json object
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const getUserByUsername = async function (userName) {
  try {
    const response = await httpOrigin.get(`/users/${userName}`);
    // here we transform the javascript response value to javascript JSON Object
    const responseData = JSON.stringify(response?.data, null, 2);
    // we return the json object
    return { data: responseData, isPresent: true };
  } catch (error) {
    return { data: null, isPresent: false };
  }
};


export const getUserByUsernameDest = async function (userName) {
  try {
    const response = await httpDestination.get(`/users/${userName}`);
    // here we transform the javascript response value to javascript JSON Object
    const responseData = JSON.stringify(response?.data, null, 2);
    logger.log(responseData);
    // we return the json object
    return { data: responseData, isPresent: true };
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
    return { data: null, isPresent: false };
  }
};


export const putUserPermissions = async function (userName, dataDto) {
  try {
    const response = await httpDestination.put(`/users/${userName}/permissions`, dataDto);
    // here we transform the javascript response value to javascript JSON Object
    const responseData = JSON.stringify(response?.data, null, 2);
    // we return the json object
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

export const postUsers = async function (dataDto) {
  try {
    const response = await httpDestination.post('/users', dataDto);
    const responseData = JSON.stringify(response?.data, null, 2);
    return responseData;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data, null, 2);
    logger.error(`${errorMessage}`);
  }
};

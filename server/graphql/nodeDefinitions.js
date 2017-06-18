import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';
import {
  getHome,
  getTask,
} from '../api';
import {
  Home,
  Task,
} from '../models';

const GETTERS = {
  Home: getHome,
  Task: getTask,
};
export const idFetcher = globalId => {
  const { type, id } = fromGlobalId(globalId);
  console.log(['nodeDefinitions.idFetcher'], globalId, { type, id });

  return GETTERS[type] ? GETTERS[type](id) : null;
};
const typeResolver = obj => {
  console.log(['nodeDefinitions.typeResolver'], obj);
  if (obj instanceof Home) {
    return require('./modules/home').default; // FIXME
  } else if (obj instanceof Task)  {
    return require('./types/task').default; // FIXME
  } else {
    return null;
  }
};

export const { nodeInterface, nodeField } = nodeDefinitions(idFetcher, typeResolver);

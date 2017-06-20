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
  const node = GETTERS[type] ? GETTERS[type](id) : null;

  if (node) {
    return node;
  }

  console.error(['nodeDefinitions.idFetcher.error'], 'Cannot resolve node by id.');

  return null;
};
const typeResolver = obj => {
  console.log(['nodeDefinitions.typeResolver'], obj);
  if (obj instanceof Home) {
    return require('./types/modules/home').default; // FIXME
  } else if (obj instanceof Task)  {
    return require('./types/task').default; // FIXME
  }

  console.error(['nodeDefinitions.typeResolver.error'], 'Cannot match instance class.');

  return null;
};

export const { nodeInterface, nodeField } = nodeDefinitions(idFetcher, typeResolver);

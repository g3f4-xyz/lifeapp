import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';
// import { #FIXME get rid off cyclic dependency
//   homeType,
//   taskType,
// } from './types';
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
const idFetcher = globalId => {
  const { type, id } = fromGlobalId(globalId);
  console.log(['nodeDefinitions.idFetcher'], globalId, { type, id });

  return GETTERS[type] ? GETTERS[type](id) : null;
};
const typeResolver = obj => {
  console.log(['nodeDefinitions.typeResolver'], obj);
  if (obj instanceof Home) {
    return require('./modules/home').default;
  } else if (obj instanceof Task)  {
    return require('./types/task').default;
  } else {
    return null;
  }
};

export const { nodeInterface, nodeField } = nodeDefinitions(idFetcher, typeResolver);

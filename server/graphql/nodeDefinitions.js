import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';
// import { #FIXME get rid off cyclic dependency
//   homeType,
//   taskType,
// } from './types';
import {
  getUser,
  getTask,
} from '../api';
import {
  Home,
  Task,
} from '../models';

const GETTERS = {
  User: getUser,
  Task: getTask,
};
const idFetcher = globalId => {
  const { type, id } = fromGlobalId(globalId);

  return GETTERS[type] ? GETTERS[type](id) : null;
};
const typeResolver = obj => {
  if (obj instanceof Home) {
    return require('./types/home');
  } else if (obj instanceof Task)  {
    return require('./types/task');
  } else {
    return null;
  }
}

export const { nodeInterface, nodeField } = nodeDefinitions(idFetcher, typeResolver);

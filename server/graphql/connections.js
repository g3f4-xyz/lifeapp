import { connectionDefinitions } from 'graphql-relay';

import taskType from './types/task';

const { connectionType: taskConnection } = connectionDefinitions({ name: 'Task', nodeType: taskType });

export { taskConnection };

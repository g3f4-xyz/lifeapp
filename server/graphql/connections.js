const { connectionDefinitions } = require('graphql-relay');
const TaskType = require('./types/TaskType');

const { connectionType: TaskTypeConnection, edgeType: TaskTypeEdge } = connectionDefinitions({ name: 'TaskType', nodeType: TaskType });

module.exports = { TaskTypeConnection, TaskTypeEdge };

const { connectionDefinitions } = require('graphql-relay');

const taskType = require('./types/task');

const { connectionType: taskConnection, edgeType: TaskEdge } = connectionDefinitions({ name: 'Task', nodeType: taskType });

module.exports = { taskConnection, TaskEdge };

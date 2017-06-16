const { connectionDefinitions } = require('graphql-relay');
const taskType = require('./types/task');

const { connectionType: taskConnection } = connectionDefinitions({ name: 'Task', nodeType: taskType });

module.exports = { taskConnection };

const {
  Home,
  Task,
} = require('./');

module.exports = obj => {
  console.log(['nodeDefinitions.typeResolver'], obj);
  if (obj instanceof Home) {
    return require('./types/modules/home').default; // FIXME
  } else if (obj instanceof Task)  {
    return require('./types/task').default; // FIXME
  }

  console.error(['nodeDefinitions.typeResolver.error'], 'Cannot match instance class.');

  return null;
};

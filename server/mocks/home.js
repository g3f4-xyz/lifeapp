const Module = require('../models/Module');
const HomeInstance = new Module({ id: 'HOME', name: 'Home module' });

// export default id => HomeInstance;
module.exports = id => HomeInstance;

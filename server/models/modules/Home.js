const mongoose = require('mongoose');

const homeModel = mongoose.Schema({
  id: {
    type: String,
    default: 'HOME',
  },
  name: {
    type: String,
    default: 'Home module',
  },
});

const Home = mongoose.model('Home', homeModel);
const homeIstance = new Home();

module.exports = homeIstance;

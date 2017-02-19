import User from '../models/User';

const loggedUser = new User();
loggedUser.id = '1';
loggedUser.title = 'Test user';

export default id => id === loggedUser.id ? loggedUser : null;

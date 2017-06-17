import Home from '../models/Home';

const HomeInstance = new Home();
HomeInstance.id = 'HOME';
HomeInstance.name = 'Home module';

export default id => HomeInstance;

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Relay from 'react-relay';
import './main.css';
import App from './components/App';
import UserRoute from './routes/user';

const render = App => {
  ReactDOM.render(
    <AppContainer>
      <Relay.Renderer
        environment={Relay.Store}
        Container={App}
        queryConfig={new UserRoute()}
      />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => render(App));
}

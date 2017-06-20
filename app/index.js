import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Relay from 'react-relay';
import './main.css';
import App from './containers/App';
import AppRoute from './routes/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const render = App => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <Relay.Renderer
          environment={Relay.Store}
          Container={App}
          queryConfig={new AppRoute()}
        />
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => render(App));
}

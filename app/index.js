import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './main.css';
import App from './components/App';

const render = App => {
  ReactDOM.render(
    <AppContainer><App /></AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => render(App));
}

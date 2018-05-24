import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Login from '../server/Login';

const fileName = 'server/login.html';
const stream = fs.createWriteStream(fileName);

stream.once('open', () => {
  const html = renderLoginToHtml();

  stream.end(html);
});

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Welcome to LifeApp</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <style id="jss-server-side">${css}</style>
      </body>
    </html>
  `;
}

function renderLoginToHtml() {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

  const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const html = renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <Login />
      </MuiThemeProvider>
    </JssProvider>
  );

  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString();

  return renderFullPage(html, css);
}

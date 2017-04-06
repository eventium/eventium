// Credits: https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app
import path from 'path';
import Express from 'express';
import React from 'react';
import thunkMiddleware from 'redux-thunk';
import SocketIO from 'socket.io';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import passport from 'passport';
import expressSession from 'express-session';

import bodyParser from 'body-parser';

import routes from './../common/routes';
import NotFoundPage from './../common/components/NotFoundPage';
import eventiumApp from './../common/reducers';
import API from './api';
import db from './models';

import socketEvents from './socketEvents';
import { messageRouter } from './routes/message_routes';
import { configPassport } from './authentication';

const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);

configPassport(passport);

// initialize the server and configure support for ejs templates
const app = new Express();


// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, '..', 'common', 'static')));

// auth related middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: null,
    path: '/',
  },
  store: new SequelizeStore({
    db: db.sequelize,
    table: 'Session',
    extendDefaultFields: (defaults, session) => {
      console.log(session);
      return {
        data: defaults.data,
        expires: defaults.expires,
        userId: session.passport.user,
      };
    },
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 10 * 60 * 1000,
  }),
}));
app.use(passport.initialize());
app.use(passport.session());

// Registrated API routes
API(app);
app.use('/api', messageRouter);

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;

      // Grab the initial state from our Redux store
      const store = createStore(eventiumApp, compose(applyMiddleware(thunkMiddleware)));
      const initialState = store.getState();
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>,
        );
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage />);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.status(200).end(renderFullPage(markup, initialState));
    },
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
const server = app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});

const io = new SocketIO(server, { path: '/api/chat' });
socketEvents(io);

function renderFullPage(markup, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/app.css">
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Eventium</title>
      </head>
      <body>
        <div id="root">${markup}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}
        </script>
        <script src="/js/bundle.js"></script>
      </body>
    </html>
  `;
}

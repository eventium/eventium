const LocalStrategy = require('passport-local').Strategy;
const models = require('./models');

export function configPassport(passport) {
  console.log('@config passport');
  passport.use('local-login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
    console.log('@local-login');
    models.User.findOne({ where: { email } })
      .then((instance) => {
        if (instance.get('password') === password) {
          return done(null, instance);
        } else {
          return done(null, false, { message: 'Failed to authenticate' });
        }
      })
      .catch((err) => {
        console.log(`error!: ${err}`);
        return done(null, false, { message: `Error: ${err}` });
      });
  }));

  passport.serializeUser((user, done) => {
    console.log('@serializeUser');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('@deserializeUser');
    models.User.findById(id)
      .then((instance) => {
        return done(null, instance);
      }).catch((err) => {
        return done(null, false, { message: `Error: ${err}` });
      });
  });
}
const authenticationWhiteList = [
  '/login',
  '/api/login',
  '/api/user',
];
export function isLoggedIn(req, res, next) {
  if (authenticationWhiteList.find(path => path === req.originalUrl)) {
    next();
  } else if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    res.end(`Unauthorized access from ${req.originalUrl}`);
  }
}

export function debugMiddleware(req, res, next) {
  console.log(req.session);
  console.log(req.user);
  next();
}

export function respondWithSession (req, res) {
  const id = req.session.passport.user;
  models.User.findById(id)
    .then((instance) => {
      res.status(200);
      res.json({
        id: instance.get('id'),
        email: instance.get('email'),
        first_name: instance.get('first_name'),
        last_name: instance.get('last_name'),
      });
    }).catch((err) => {
      console.log(`${req.originalUrl} error: ${err}`);
      res.status(500);
      res.end();
    });
}
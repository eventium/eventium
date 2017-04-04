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

export function isLoggedIn(req, res, next) {
  if (req.path === '/login' || req.path === '/api/login') {
    next();
  } else if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    res.end('Unauthorized');
  }
}

export function debugMiddleware(req, res, next) {
  console.log(req.session);
  console.log(req.user);
  next();
}

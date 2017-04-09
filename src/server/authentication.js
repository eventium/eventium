const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const models = require('./models');

function comparePassword(password, instance) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, instance.get('password'), (err, match) => {
      if (err) {
        reject(err);
      } else if (!match) {
        resolve(null);
      } else {
        resolve(instance);
      }
    });
  });
}

export function configPassport(passport) {
  console.log('@config passport');
  passport.use('local-login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
    console.log('@local-login');
    models.User.findOne({ where: { email } })
      .then(instance => comparePassword(password, instance))
      .then((instance) => {
        if (instance) {
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

export function respondWithSession(req, res) {
  const instance = req.user;
  res.status(200);
  res.json({
    id: instance.get('id'),
    email: instance.get('email'),
    first_name: instance.get('first_name'),
    last_name: instance.get('last_name'),
  });
}

export function createUser(req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500);
      res.end(err);
    } else {
      models.User.create({
        email: req.body.email,
        password: hash,
      }).then(() => {
        res.status(201);
        res.end();
      }).catch((err2) => {
        res.status(409);
        res.end(err2);
      });
    }
  });
}

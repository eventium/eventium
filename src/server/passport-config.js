const LocalStrategy = require('passport-local').Strategy;

// TODO: use a real db here instead of mock user
const user = {
  username: 'eventium',
  password: 'eventium',
  token: '12345',
};
const passportConfig = (passport) => {
  passport.use(new LocalStrategy((username, password, done) => {
    if (username === user.username && password === user.password) {
      return done(null, user);
    } else {
      return done(null, false, {message: 'Failed to authenticate'});
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.token);
  });

  passport.deserializeUser((token, done) => {
    if (token === user.token) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
};

export default passportConfig;
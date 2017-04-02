const LocalStrategy = require('passport-local').Strategy;

// TODO: use a real db here instead of mock user
const user = {
  username: 'eventium',
  password: 'eventium',
  token: '12345',
};
const passportConfig = (passport) => {
  passport.use('local-login', new LocalStrategy((username, password, done) => {
    console.log('@local strategy');
    if (username === user.username && password === user.password) {
      return done(null, user);
    } else {
      return done(null, false, {message: 'Failed to authenticate'});
    }
  }));

  passport.serializeUser((user, done) => {
    console.log('@serializeUser');
    done(null, user.token);
  });

  passport.deserializeUser((token, done) => {
    console.log('@deserializeUser');
    if (token === user.token) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
};

export default passportConfig;
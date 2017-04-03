const LocalStrategy = require('passport-local').Strategy;

// TODO: use a real db here instead of mock user
const user = {
  username: 'eventium',
  password: 'eventium',
  id: '1',
};
const passportConfig = (passport) => {
  console.log('@config passport');
  passport.use('local-login', new LocalStrategy((username, password, done) => {
    console.log('@local-login');
    if (username === user.username && password === user.password) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Failed to authenticate' });
    }
  }));

  passport.serializeUser((user, done) => {
    console.log('@serializeUser');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('@deserializeUser');
    if (id === user.id) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
};

export default passportConfig;
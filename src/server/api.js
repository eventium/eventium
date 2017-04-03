import passport from 'passport';

const models = require('./models');

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) { next(); }
  // if they aren't redirect them to the home page
  res.redirect('/login');
}

function debugMiddleware(req, res, next) {
  console.log(req.session);
  console.log(req.user);
  next()
}

const API = (app) => {
  app.post('/api/login', passport.authenticate('local-login'), (req, res) => {
    console.log(req.session);
    res.json({});
  });

  app.get('/api/events/', (req, res) => {
    models.Event.findAll().then(instances =>
      instances.map(instance =>
        instance.get()
      )
    ).then(events => {
      res.json({
        'events': events
      });
    })
  })

  app.get('/api/events/:id', (req, res) => {
    const id = parseInt(req.params.id);
    models.Event.findById(id).then(instance => {
      res.json(instance.get());
    })
  })
};

export default API;

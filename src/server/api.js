import passport from 'passport';

const models = require('./models');

const API = (app) => {
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

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

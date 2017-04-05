import passport from 'passport';
import { isLoggedIn } from './authentication';

const models = require('./models');

const API = (app) => {
  app.use(['/api/*'], isLoggedIn);
  app.post('/api/login', passport.authenticate('local-login'), (req, res) => {
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
        console.log(`/api/login error: ${err}`);
        res.status(500);
        res.end();
      });
  });
  app.get('/api/session', (req, res) => {
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
        res.status(500);
        res.end(`/api/session error: ${err}`);
      });
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

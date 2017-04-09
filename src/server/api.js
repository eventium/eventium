import passport from 'passport';
import { isLoggedIn, respondWithSession, createUser } from './authentication';
import { addUploadedImageExtension } from './utils/image.js';

const models = require('./models');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

const API = (app) => {
  app.use(['/api/*'], isLoggedIn);

  app.post('/api/login', passport.authenticate('local-login'), respondWithSession);

  app.get('/api/session', respondWithSession);

  app.delete('/api/session', (req, res) => {
    req.logout();
    res.status(200);
    res.end();
  });

  app.post('/api/user', createUser);

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

  app.post('/api/events/', upload.single('image'), (req, res) => {
    console.log(req.file);

    const start_time = req.body.start_date + ' ' + req.body.start_time + ':00';
    const end_time = req.body.end_date + ' ' + req.body.end_time + ':00';
    
    let event = {
      title: req.body.title,
      location: req.body.location,
      address: req.body.address,
      city: req.body.city,
      province: req.body.province,
      postal_code: req.body.postal_code,
      description: req.body.description,
      start_time: start_time,
      end_time: end_time,
    };

    const promise = addUploadedImageExtension(req.file);

    Promise.all([promise]).then((imgPath) => {
      if(imgPath[0]) {
        event.image = imgPath[0];
      }

      models.Event.create(event).then(
        event => {
          res.json(event)
        }
      ).catch(error => {
        console.log(error);
      });
    });
  })

  app.put('/api/events/:id', upload.single('image'), (req, res) => {
    const id = parseInt(req.params.id);
    const start_time = req.body.start_date + ' ' + req.body.start_time + ':00';
    const end_time = req.body.end_date + ' ' + req.body.end_time + ':00';

    const event = {
      address: req.body.address,
      city: req.body.city,
      description: req.body.description,
      end_time: end_time,
      id: req.body.id,
      location: req.body.location,
      postal_code: req.body.postal_code,
      province: req.body.province,
      start_time: start_time,
      title: req.body.title,
    };

    const promise = addUploadedImageExtension(req.file);

    Promise.all([promise]).then((imgPath) => {
      if(imgPath[0]) {
        event.image = imgPath[0];
      }

      models.Event.upsert(event).then(
        created => {
          models.Event.findById(id).then(instance => {
            res.json(instance.get());
          });
        }
      ).catch(error => {
        console.log(error);
      });
    });
  })
};

export default API;

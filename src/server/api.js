import passport from 'passport';
import { isLoggedIn, respondWithSession, createUser } from './authentication';
import { addUploadedImageExtension } from './utils/image';

const multer = require('multer');
const models = require('./models');

const upload = multer({ dest: 'uploads/' });

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

  app.post('/api/events/', upload.single('image'), (req, res) => {
    console.log(req.file);

    const userId = req.body.userId;
    const start_time = req.body.start_date + ' ' + req.body.start_time + ':00';
    const end_time = req.body.end_date + ' ' + req.body.end_time + ':00';

    const event = {
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
      if (imgPath[0]) {
        event.image = imgPath[0];
      }

      models.Event.create(event).then(
        (instance) => {
          models.Member.create({
            event_id: instance.id,
            user_id: userId,
            role: 'host',
          });
          res.json(instance);
        }).catch((err) => {
          console.log(err);
        });
    });
  });

  app.put('/api/events/:id', upload.single('image'), (req, res) => {
    const id = parseInt(req.params.id);
    const start_time = req.body.start_date + ' ' + req.body.start_time + ':00';
    const end_time = req.body.end_date + ' ' + req.body.end_time + ':00';

    const event = {
      address: req.body.address,
      city: req.body.city,
      description: req.body.description,
      end_time: end_time,
      id: id,
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

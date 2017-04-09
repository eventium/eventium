import bodyParser from 'body-parser';
import express from 'express';
import models from './../models';

function authorizeEvent(paramName) {
  return (req, res, next) => {
    const eventId = parseInt(req.params[paramName], 10);
    const userId = req.session.passport.user;
    models.Member.findAll({
      where: {
        event_id: eventId,
        user_id: userId,
      },
      limit: 1,
    }).then((instances) => {
      if (instances.length === 1) {
        next();
      } else {
        res.status(401);
        res.end('Unauthorized');
      }
    });
  };
}

const messageRouter = express.Router();
messageRouter.use(bodyParser.json());

messageRouter.get('/events/:id/messages/', authorizeEvent('id'), (req, res) => {
  const eventId = parseInt(req.params.id, 10);

  models.Message.findAll({
    where: {
      event_id: eventId,
    },
    order: 'created_on ASC',
    include: [{ model: models.User, attributes: ['first_name'] }],
  })
  .then(messages => res.json(messages));
});


messageRouter.post('/events/:id/messages/', authorizeEvent('id'), (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const content = req.body.content;
  const userId = req.body.user_id;
  const createdOn = req.body.created_on;
  models.Message.create({
    content: content,
    event_id: eventId,
    user_id: userId,
    created_on: createdOn,
  });
  return res.status(200);
});

export { messageRouter };

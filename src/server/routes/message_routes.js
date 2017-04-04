import bodyParser from 'body-parser';
import express from 'express';
import models from './../models';

const messageRouter = express.Router();
messageRouter.use(bodyParser.json());

messageRouter.get('/events/:id/messages/', (req, res) => {
  const eventId = parseInt(req.params.id);

  models.Message.findAll({
    where: {
      event_id: eventId,
    },
    order: 'created_on ASC',
  })
  .then(messages => res.json(messages));
});


messageRouter.post('/events/:id/messages/', (req, res) => {
  const eventId = parseInt(req.params.id);
  const content = req.body.content;
  models.Message.create({
    content: content,
    event_id: eventId,
  });
  return res.status(200);
});

export { messageRouter };

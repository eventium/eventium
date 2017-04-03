import bodyParser from 'body-parser';
import express from 'express';
import models from './../models';

const messageRouter = express.Router();
// const messages = [{ uuid: 'f27f2d20-50f1-496d-984f-946a45d90514', text: 'Hello from msg 1' }, { uuid: 'f27f2d20-51f1-496d-984f-946a45d90514', text: 'Hello from msg 2' }];

messageRouter.use(bodyParser.json());

messageRouter.get('/events/:id/messages/', (req, res) => {
  const eventId = parseInt(req.params.id);

  models.Message.findAll({
    where: {
      event_id: eventId,
    },
    order: 'created_on DESC',
  })
  .then(messages => res.json(messages));
});


messageRouter.post('/events/:id/messages/', (req, res) => {
  const eventId = parseInt(req.params.id);
  const content = req.body.content;
  models.Message.create({
    content: content,
  });
  return res.status(200);
});

export { messageRouter };

import bodyParser from 'body-parser';
import express from 'express';

const messageRouter = express.Router();
const messages = [{ id: 1, text: 'Hello from msg 1' }, { id: 2, text: 'Hello from msg 2' }];

messageRouter.use(bodyParser.json());

messageRouter.get('/messages', (req, res) => {
  return res.json(messages);
});

messageRouter.post('/messages', (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  return res.status(200);
});

export { messageRouter };

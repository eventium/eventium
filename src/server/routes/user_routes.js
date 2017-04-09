import bodyParser from 'body-parser';
import express from 'express';
import models from './../models';

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get('/users/:id/invites/', (req, res) => {
  const userId = parseInt(req.params.id);
  models.Invite.findAll({
    where: {
      guest_id: userId,
    },
    include: [{ model: models.Event, attributes: ['title', 'location', 'start_time'] }],
  })
  .then(invites => res.json(invites));
});

userRouter.get('/users/:id/events/', (req, res) => {
  const userId = parseInt(req.params.id);
  models.Member.findAll({
    where: {
      user_id: userId,
    },
    include: [{ model: models.Event, attributes: ['id', 'title', 'location', 'start_time'] }],
  })
  .then((membership) => {
    const events = membership.map(membership => membership.Event);
    res.json(events);
  });
});

userRouter.delete('/users/:userId/invites/:inviteId/', (req, res) => {
  const userId = parseInt(req.params.userId);
  const inviteId = parseInt(req.params.inviteId);

  models.Invite.destroy({
    where: {
      id: inviteId,
    },
  })
  .then((rowsDeleted) => {
    if (rowsDeleted === 1) {
      return res.status(200).send();
    }
    return res.status(404).send('No Invite Found');
  });
});

userRouter.post('/users/:userId/membership/', (req, res) => {
  const userId = parseInt(req.params.userId);
  const eventId = parseInt(req.body.eventId);
  if (!eventId) {
    return res.status(409).end();
  }

  models.Member.create({
    event_id: req.body.eventId,
    user_id: userId,
    role: 'guest',
  })
  .then((instance) => {
    return res.status(201).end();
  })
  .catch((err) => {
    return res.status(409).end();
  });
});

userRouter.get('/users/email/:email/', (req, res) => {
  const email = req.params.email;
  models.User.findOne({
    where: {
      email: email,
    },
  })
  .then((user) => {
    if (!user) {
      return res.status(404).end();
    }
    return res.json(user);
  });
});

export { userRouter };

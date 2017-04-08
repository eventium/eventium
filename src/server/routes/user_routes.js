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
  .then(membership => {
    const events = membership.map(membership => membership.Event);
    res.json(events);
  });
});

export { userRouter };

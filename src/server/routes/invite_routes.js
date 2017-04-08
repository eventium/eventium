import bodyParser from 'body-parser';
import express from 'express';
import models from './../models';

const inviteRouter = express.Router();
inviteRouter.use(bodyParser.json());

inviteRouter.get('/invites/', (req, res) => {
  models.Invite.findAll({
    include: [{ model: models.Event, attributes: ['title', 'location', 'start_time'] }],
  })
  .then(invites => res.json(invites));
});

export { inviteRouter };

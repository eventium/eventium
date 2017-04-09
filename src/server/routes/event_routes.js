import bodyParser from 'body-parser';
import express from 'express';
import models from './../models';
import { authorizeEvent } from '../authorization';

const eventRouter = express.Router();
eventRouter.use(bodyParser.json());

eventRouter.get('/events/:id/members/', authorizeEvent('id'), (req, res) => {
  const eventId = parseInt(req.params.id, 10);

  models.Member.findAll({
    where: {
      event_id: eventId,
    },
    include: [{ model: models.User, attributes: ['first_name', 'last_name'] }],
  })
  .then(members => res.json(members));
});


eventRouter.get('/events/:id/invites/', authorizeEvent('id'), (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const Guest = models.Invite.belongsTo(models.User, { as: 'Guest', foreignKey: 'guest_id' });

  models.Invite.findAll({
    where: {
      event_id: eventId,
    },
    include: [{ association: Guest, attributes: ['first_name', 'last_name'] }],
  })
  .then(invites => res.json(invites));
});

export { eventRouter };

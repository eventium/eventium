import bodyParser from 'body-parser';
import express from 'express';
import models from './../models';

const eventRouter = express.Router();
eventRouter.use(bodyParser.json());

eventRouter.get('/events/:id/members/', (req, res) => {
  const eventId = parseInt(req.params.id);

  models.Member.findAll({
    where: {
      event_id: eventId,
    },
    include: [{ model: models.User, attributes: ['first_name', 'last_name'] }],
  })
  .then(members => res.json(members));
});


eventRouter.get('/events/:id/invites/', (req, res) => {
  const eventId = parseInt(req.params.id);
  const Guest = models.Invite.belongsTo(models.User, { as: 'Guest', foreignKey: 'guest_id'});

  models.Invite.findAll({
    where: {
      event_id: eventId,
    },
    include: [{ association: Guest, attributes: ['first_name', 'last_name'] }],
  })
  .then(invites => res.json(invites));
});

eventRouter.get('/events/:id/invites/', (req, res) => {
  const eventId = parseInt(req.params.id);
  const Guest = models.Invite.belongsTo(models.User, { as: 'Guest', foreignKey: 'guest_id'});

  models.Invite.findAll({
    where: {
      event_id: eventId,
    },
    include: [{ association: Guest, attributes: ['first_name', 'last_name'] }],
  })
  .then(invites => res.json(invites));
});

eventRouter.post('/events/:id/invites/', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const hostId = req.body.hostId;
  const guestId = req.body.guestId;
  console.log("body", req.body);
  if (!eventId || !hostId || !guestId) {
    return res.status(400).end();
  }

  models.Member.findOne({
    where: {
      event_id: eventId,
      user_id: guestId,
    },
  })
  .then((member) => {
    if (member) {
      return res.status(403).end('This user is already a member of this event');
    }

    return models.Invite.findOne({
      where: {
        event_id: eventId,
        guest_id: guestId,
      },
    });
  })
  .then((invite) => {
    if (invite) {
      return res.status(403).end('This user is already invited to this event');
    }

    return models.Invite.create({
      event_id: eventId,
      guest_id: guestId,
      host_id: hostId,
    });
  })
  .then((newInvite) => {
    return res.status(201).end();
  })
  .catch((err) => {
    return res.status(400).end(`Error: ${err}`);
  });
});

export { eventRouter };

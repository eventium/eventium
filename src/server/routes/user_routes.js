import bodyParser from 'body-parser';
import express from 'express';
import models from './../models';

function authorizeUser(paramName) {
  return (req, res, next) => {
    const requestUser = parseInt(req.params[paramName], 10);
    const sessionUser = req.session.passport.user;
    if (requestUser === sessionUser) {
      next();
    } else {
      res.status(401);
      res.end(`Unauthorized access from ${req.originalUrl}`);
    }
  };
}

function authorizeInvite(paramName) {
  return (req, res, next) => {
    const requestInvite = parseInt(req.params[paramName], 10);
    const sessionUser = req.session.passport.user;
    models.Invite.findById(requestInvite)
      .then((instance) => {
        if (instance.get('guest_id') === sessionUser) {
          res.locals.invite = instance;
          next();
        } else {
          res.status(401);
          res.end(`Unauthorized access from ${req.originalUrl}`);
        }
      })
      .catch((err) => {
        res.status(500);
        res.end(`Server error: ${err}`);
      });
  };
}

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get('/users/:id/invites/', authorizeUser('id'), (req, res) => {
  const userId = parseInt(req.params.id, 10);
  models.Invite.findAll({
    where: {
      guest_id: userId,
    },
    include: [{ model: models.Event, attributes: ['title', 'location', 'start_time'] }],
  })
  .then(invites => res.json(invites));
});

userRouter.get('/users/:id/events/', authorizeUser('id'), (req, res) => {
  const userId = parseInt(req.params.id, 10);
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

userRouter.delete('/users/:userId/invites/:inviteId/', authorizeInvite('inviteId'), (req, res) => {
  const inviteId = parseInt(req.params.inviteId, 10);

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
  const userId = parseInt(req.params.userId, 10);
  const eventId = parseInt(req.body.eventId, 10);
  if (!eventId) {
    res.status(409).end();
  }

  models.Invite.findAll({
    where: {
      guest_id: userId,
      event_id: eventId,
    },
  }).then((instances) => {
    if (instances.length > 0) {
      return models.Member.create({
        event_id: req.body.eventId,
        user_id: userId,
        role: 'guest',
      });
    } else {
      return Promise.reject();
    }
  })
  .then(() => {
    res.status(201).end();
  })
  .catch(() => {
    res.status(409).end();
  });
});


export { userRouter };

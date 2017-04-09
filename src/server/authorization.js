import models from './models';
export function authorizeEvent(paramName) {
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

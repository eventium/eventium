module.exports = (sequelize, DataType) => {
  const Invite = sequelize.define('Invite', {
    id: {
      type: DataType.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataType.INTEGER,
      field: 'event_id',
    },
    guest_id: {
      type: DataType.INTEGER,
      field: 'guest_id',
    },
    host_id: {
      type: DataType.INTEGER,
      field: 'host_id',
    },
    message: {
      type: DataType.TEXT,
      field: 'message',
    },
  }, {
    indexes: [
      {
        fields: ['event_id'],
      },
    ],
    classMethods: {
      associate: (models) => {
        Invite.belongsTo(models.Event, { foreignKey: 'event_id' });
        Invite.belongsTo(models.User, { as: 'Guest', foreignKey: 'guest_id' });
        Invite.belongsTo(models.User, { as: 'Host', foreignKey: 'host_id' });
      },
    },
  });

  return Invite;
};

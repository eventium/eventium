const uuid = require('node-uuid');

module.exports = (sequelize, DataType) => {
  const Message = sequelize.define('Message', {
    uuid: {
      type: DataType.UUID,
      defaultValue: () => (uuid.v4()),
      primaryKey: true,
    },
    event_id: {
      type: DataType.INTEGER,
      field: 'event_id',
    },
    user_id: {
      type: DataType.INTEGER,
      field: 'user_id',
    },
    created_on: {
      type: DataType.DATE,
      field: 'created_on',
    },
    content: {
      type: DataType.TEXT,
      field: 'content',
      defaultValue: DataType.NOW,
    },
  }, {
    indexes: [
      {
        fields: ['event_id'],
      },
    ],
  });

  return Message;
};

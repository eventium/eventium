module.exports = (sequelize, DataType) => {
  const Member = sequelize.define('Member', {
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
    user_id: {
      type: DataType.INTEGER,
      field: 'user_id',
    },
    role: {
      type: DataType.STRING,
      field: 'role',
    },
  }, {
    indexes: [
      {
        fields: ['event_id'],
      },
    ],
    classMethods: {
      associate: (models) => {
        Member.belongsTo(models.Event, { foreignKey: 'event_id' });
        Member.belongsTo(models.User, { foreignKey: 'user_id' });
      },
    },
  });

  return Member;
};

module.exports = (sequelize, DataType) =>
  sequelize.define('Session', {
    sid: {
      type: DataType.STRING,
      primaryKey: true,
    },
    userId: DataType.INTEGER,
    expires: DataType.DATE,
    data: DataType.STRING(50000),
  });


module.exports = function(sequelize, DataType) {
	var Message = sequelize.define('Message', {
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
		created_on: {
			type: DataType.DATE,
			field: 'created_on',
		},
		content: {
			type: DataType.TEXT,
			field: 'content',
		},
	});

	return Message;
}
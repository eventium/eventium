module.exports = function(sequelize, DataType) {
	var Member = sequelize.define('Member', {
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
	});

	return Member;
}
module.exports = function(sequelize, DataType) {
	var Invite = sequelize.define('Invite', {
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
		created_on: {
			type: DataType.DATE,
			field: 'created_on',
		},
		message: {
			type: DataType.TEXT,
			field: 'message',
		},
	});

	return Invite;
}
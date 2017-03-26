module.exports = function(sequelize, DataType) {
	var Event = sequelize.define('Event', {
		id: {
			type: DataType.INTEGER,
			field: 'id',
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataType.STRING,
			field: 'title',
		},
		address: {
			type: DataType.STRING,
			field: 'address'
		},
		city: {
			type: DataType.STRING,
			field: 'city'
		},
		postal_code: {
			type: DataType.STRING,
			field: 'postal_code'
		},
		description: {
			type: DataType.STRING,
			field: 'description'
		},
		image: {
			type: DataType.STRING,
			field: 'image'
		},
		start_time: {
			type: DataType.DATE,
			field: 'start_time'
		},
		end_time: {
			type: DataType.DATE,
			field: 'end_time',
		},
	});

	return Event;
};
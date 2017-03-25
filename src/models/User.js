module.exports = function(sequelize, DataType) {
	var User = sequelize.define('User', {
		id: {
			type: DataType.INTEGER,
			field: 'id',
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataType.STRING,
			field: 'email',
		},
		password: {
			type: DataType.STRING,
			field: 'password',
		},
		first_name: {
			type: DataType.STRING,
			field: 'first_name',
		},
		last_name: {
			type: DataType.STRING,
			field: 'last_name',
		},
		description: {
			type: DataType.STRING,
			field: 'description',
		},
		avatar: {
			type: DataType.STRING,
			field: 'avatar',
		},
	});

	return User;
}
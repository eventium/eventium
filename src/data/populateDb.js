var fs = require('fs');
var path = require('path')
var models = require('../models');

models.sequelize.sync({force: true}).then(function() {
	var events, users, messages, members;

	events = populate_table(fs, './events.json', models.Event);
	users = populate_table(fs, './users.json', models.User);

	Promise.all([events, users]).then(
		function() {
			messages = populate_table(fs, './messages.json', models.Message);
			//members = populate_table(fs, './members.json', models.Member);
		},
		function() {
			console.log('** Error: could not populate DB with messages and members.');
		}
	);
});

function populate_table(fs, file, table) {
	var promise = new Promise(function(resolve, reject) {
		try {
			fs.readFile(path.resolve(__dirname, file), function(err, data) {
				var contents = JSON.parse(data);

				contents.forEach(function(object) {
					table.create(object);
				});
				resolve();
			});
		} catch(error) {
			console.log(error);
			reject();
		}
	});

	return promise;
}

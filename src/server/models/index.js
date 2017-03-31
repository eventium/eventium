var fs = require('fs');
var path = require('path');
var Sequelize = require("sequelize");
var sequelize = new Sequelize('eventium', 'app', '@ppl1c@t10n', {dialect: 'postgres', host: 'localhost'});

var db = {}

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	})
	.forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.User.belongsToMany(db.Event, {through: db.Member, foreignKey: 'event_id', otherKey: 'id'});
db.Event.belongsToMany(db.User, {through: db.Member, foreignKey: 'user_id', otherKey: 'id'});

db.Invite.belongsTo(db.Event, {foreignKey: 'event_id'});
db.Invite.belongsTo(db.User, {foreignKey: 'guest_id'});
db.Invite.belongsTo(db.User, {foreignKey: 'host_id'});

db.Message.belongsTo(db.Event, {foreignKey: 'event_id'});
db.Message.belongsTo(db.User, {foreignKey: 'user_id'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
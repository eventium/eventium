const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const models = require('../models');

function populateTableWithCB(file, table, cb) {
  const promise = new Promise((resolve, reject) => {
    try {
      fs.readFile(path.resolve(__dirname, file), (err, data) => {
        const contents = JSON.parse(data);

        contents.forEach(cb);
        resolve();
      });
    } catch (error) {
      console.log(error);
      reject();
    }
  });

  return promise;
}

function populateTable(file, table) {
  return populateTableWithCB(file, table, (object) => {
    table.create(object);
  });
}

function populateUserTable(file, table) {
  return populateTableWithCB(file, table, (object) => {
    table.create(Object.assign(object, {
      password: bcrypt.hashSync(object.password, 10),
    }));
  });
}

models.sequelize.sync({ force: true }).then(() => {
  const events = populateTable('./events.json', models.Event);
  const users = populateUserTable('./users.json', models.User);

  Promise.all([events, users]).then(() => {
    populateTable('./messages.json', models.Message);
    populateTable('./invites.json', models.Invite);
    populateTable('./members.json', models.Member);
  },
  () => {
    console.log('** Error: could not populate DB with messages and members.');
  });
});

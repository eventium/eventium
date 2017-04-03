const fs = require('fs');
const path = require('path');
const models = require('../models');

models.sequelize.sync({ force: true }).then(() => {
  const events = populateTable('./events.json', models.Event);
  const users = populateTable('./users.json', models.User);

  Promise.all([events, users]).then(() => {
    const messages = populateTable('./messages.json', models.Message);
    //members = populateTable(fs, './members.json', models.Member);
  },
  () => {
    console.log('** Error: could not populate DB with messages and members.');
  });
});

function populateTable(file, table) {
  const promise = new Promise((resolve, reject) => {
    try {
      fs.readFile(path.resolve(__dirname, file), (err, data) => {
        const contents = JSON.parse(data);

        contents.forEach((object) => {
          table.create(object);
        });
        resolve();
      });
    } catch (error) {
      console.log(error);
      reject();
    }
  });

  return promise;
}

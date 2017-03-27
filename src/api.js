var models = require('./models');
const events = {
  events: [
    {
      id: 1,
      title: 'Hiking Hypeday',
      time: 1490567717959,
      location: {
        city: 'Vancouver',
        address: '1234 Commercial Dr.',
        postal: 'A1B 2C3'
      },
      description: "Let's go hiking!"
    },
    {
      id: 2,
      title: 'Biking Marathon',
      time: 1490567717959,
      location: {
        city: 'Vancouver',
        address: '1234 Commercial Dr.',
        postal: 'A1B 2C3'
      },
      description: "Let's go biking!"
    }
  ]
};

const API = (app) => {
  app.get('/api/events/', (req, res) => {
    models.Event.findAll().then(instances =>
      instances.map(instance =>
        instance.get()
      )
    ).then(events => {
      res.json({
        'events': events
      });
    })
  })

  app.get('/api/events/:id', (req, res) => {
    const id = parseInt(req.params.id);
    models.Event.findById(id).then(instance => {
      res.json(instance.get());
    })
    //const event = events.events.find((event) => {return event.id === id});
    //res.json(event);
  })
};

export default API;

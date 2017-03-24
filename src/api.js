const events = { events: [{id: 1, title: 'Hiking Hypeday'}, {id: 2, title: 'Biking Marathon'}]};

const API = (app) => {
  app.get('/api/events/', (req, res) => {
    res.json(events);
  })

  app.get('/api/events/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const event = events.events.filter((event) => {return event.id === id});
    res.json(event);
  })
};

export default API;

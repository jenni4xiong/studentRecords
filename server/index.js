const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./database.js');
const pagination = require('./pagination.js');
const auth = require('./auth.js');

app.use(bodyParser.json());
app.use(auth);
app.use(express.static('../client/dist'))

app.get('/students', pagination(db.Student), (req, res) => {
  res.set('x-total-count', res.totalCount);
  res.send({ studentRecords: res.paginatedResults });
});

app.get('/students/:id', (req, res) => {
  db.getStudent(req.params.id)
    .then((student) => res.send(student))
    .catch((err) => res.sendStatus(400).send(err));
});

app.post('/students', (req, res) => {
  console.log('post: ', req.body)
  db.addStudent(req.body)
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(400).send(err));
});

app.put('/students/:id', (req, res) => {
  console.log('inside put')
  db.updateStudent(req.params.id, req.body)
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(400).send(err));
});

app.delete('/students/:id', (req, res) => {
  db.deleteStudent(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(400).send(err));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
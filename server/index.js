const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./database.js');
const middleware = require('./middleware.js');

app.use(bodyParser.json());

/* 
Build a single RESTful microservice accessible over HTTP 
(HTTPS is not required) that provides basic CRUD methods 
to list, get, create, update, and delete student records. 
The list method must support pagination 
(specifying an index, count, and sort order) 
and should include an x-total-count header 
so that the client understands the total number of records available. 
The RESTful API should support basic authentication
 using a simple username and token (can be hardwired). 
 The student database should be populated with approximately 200 records 
 (fake data with non-sensical fields is fine). 
 The microservice can be built using any framework and/or language.
*/

app.get('/students', middleware.paginatedResults(db.Student), (req, res) => {
  res.set('x-total-count', res.totalCount);
  res.send({ studentRecords: res.paginatedResults });
});

app.get('/students/:id', (req, res) => {
  db.getStudent(req.params.id)
    .then((student) => res.send(student))
    .catch((err) => res.sendStatus(400).send(err));
});

app.post('/students', (req, res) => {
  db.addStudent(req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(400).send(err));
});

app.patch('/students/:id', (req, res) => {
  db.updateStudent(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(400).send(err));
});

app.delete('/students/:id', (req, res) => {
  db.deleteStudent(req.params.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.sendStatus(400).send(err));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
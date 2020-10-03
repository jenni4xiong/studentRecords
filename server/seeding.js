const faker = require('faker');
const { Mongoose } = require('mongoose');
const db = require('./database.js');

const create200Students = () => {
  const promises = [];
  for (let i = 0; i < 200; i++) {
    const student = {};
    student.name = faker.name.findName();
    student.age = Math.floor(Math.random() * (18 - 10) + 10);
    student.grade = Math.floor(Math.random() * (12 - 1) + 1);
    const promise = db.addStudent(student)
    promise
      .then(() => console.log('inputed student record ', i))
    promises.push(promise);
  }
  Promise.all(promises)
    .then(() => console.log('successfully inputed all students'))
};

create200Students();
const faker = require('faker');
const db = require('./database.js');

const createStudents = (amount) => {
  const promises = [];
  for (let i = 0; i < amount; i++) {
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

createStudents(200);
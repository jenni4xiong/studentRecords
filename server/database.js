const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/studentRecords');
const Schema = mongoose.Schema;

//schema -> id, name, grade, gender, age
const studentSchema = new Schema({
  name: String,
  grade: Number,
  gender: String,
  age: Number
}, { autoCreate: true });

const Student = mongoose.model('student', studentSchema)

const getAllStudents = () => {
  return Student.find({});
}

const addStudent = (student) => {
  return Student.create(student)
}

module.exports = { getAllStudents, addStudent }

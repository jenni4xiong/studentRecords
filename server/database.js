const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/studentRecords', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

//schema -> id, name, grade, gender, age
const studentSchema = new Schema({
  name: String,
  grade: Number,
  gender: String,
  age: Number
}, { autoCreate: true });

const Student = mongoose.model('student', studentSchema)

const getAllStudents = (page, limit) => {
  return Student.find({});
}

const addStudent = (student) => {
  return Student.create(student);
}

const deleteStudent = (student) => {
  return Student.deleteOne({ _id: student._id });
}

module.exports = { getAllStudents, addStudent, deleteStudent, Student };

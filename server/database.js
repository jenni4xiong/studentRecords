const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/studentRecords', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  picture: String,
  name: String,
  grade: Number,
  age: Number,
}, { autoCreate: true });

const Student = mongoose.model('student', studentSchema)

const getStudent = (id) => {
  return Student.find({ _id: id })
}

const addStudent = (student) => {
  return Student.create(student);
}

const updateStudent = (id, attribute) => {
  return Student.findOneAndUpdate({ _id: id }, attribute)
}

const deleteStudent = (id) => {
  return Student.deleteOne({ _id: id });
}

module.exports = { Student, getStudent, addStudent, updateStudent, deleteStudent };

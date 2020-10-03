const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/studentRecords', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: String,
  grade: Number,
  age: Number
}, { autoCreate: true });

const Student = mongoose.model('student', studentSchema)

const getStudent = (id) => {
  return Student.find({ _id: id })
}

const addStudent = (student) => {
  return Student.create(student);
}

//5f69c40ae9906e1d37caf114

const deleteStudent = (id) => {
  return Student.deleteOne({ _id: id });
}

module.exports = { Student, getStudent, addStudent, deleteStudent };

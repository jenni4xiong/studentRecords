const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/studentRecords', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: String,
  grade: Number,
  age: Number
}, { autoCreate: true });

const Student = mongoose.model('student', studentSchema)

const addStudent = (student) => {
  return Student.create(student);
}

const deleteStudent = (student) => {
  return Student.deleteOne({ _id: student._id });
}

module.exports = { Student, addStudent, deleteStudent };

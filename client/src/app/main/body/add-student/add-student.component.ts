import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  name: string;
  age: number;
  grade: number;
  imageUrl: string;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.formGroup = this.formBuilder.group({
      name: '',
      age: null,
      grade: null,
      imageUrl: '',
    })
  }

  onSubmit() {
    const student = {
      name: this.formGroup.controls.name.value,
      age: this.formGroup.controls.age.value,
      grade: this.formGroup.controls.grade.value,
      picture: this.formGroup.controls.imageUrl.value,
    }
    this.addStudent(student)
    this.formGroup.controls.name.value = '';
    this.formGroup.controls.age.value = null;
    this.formGroup.controls.grade.value = null;
    this.formGroup.controls.imageUrl.value = '';
  }

  addStudent(student: any) {
    console.log('student to add:', student)
    this.http.post('/students', student)
      .subscribe((data) => console.log('successful post', data))
  }
}

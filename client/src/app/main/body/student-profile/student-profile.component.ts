import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  @Input() studentId: string
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.formGroup = this.formBuilder.group({
      name: '',
      age: null,
      grade: null,
      picture: '',
    })
  }

  student: any = {}

  createProfile(data) {
    console.log('creating profile', data)
    this.student = data[0]
  }

  getStudent(id: string) {
    if (id.length > 0) {
      this.http.get(`/students/${id}`)
        .subscribe((data) => { console.log('data', data); this.createProfile(data) })
    }
  }

  onDelete(id: string) {
    this.http.delete(`/students/${id}`)
    this.student = {}
  }

  updateStudent(id: string, student: any) {
    console.log('student', student, id)
    // this.http.put(`/students/${id}`, student)
  }

  onSubmit(id: string) {
    console.log('checking name', this.formGroup)
    const studentInfo = {
      name: this.formGroup.controls.name.value,
      age: this.formGroup.controls.age.value,
      grade: this.formGroup.controls.grade.value,
      imageUrl: this.formGroup.controls.imageUrl.value,
    }
    this.updateStudent(id, studentInfo)
  }

  ngOnChanges(changes): void {
    this.getStudent(changes.studentId.currentValue)
  }

  ngOnInit(): void {
    this.getStudent(this.studentId)
  }

}

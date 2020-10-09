import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  @Input() studentId: string
  formGroup: FormGroup;
  profileForm = this.formBuilder.group({
    name: [''],
    age: [null],
    grade: [null],
    picture: [''],
  })

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  studentPicture: string = ''

  createProfile(data) {
    console.log('creating profile', data)
    const student = data[0]
    this.profileForm.patchValue({
      name: student.name,
      age: student.age,
      grade: student.grade,
      picture: student.picture,
    })
    this.studentPicture = student.picture
    this.studentId = student._id
    console.log('student', this.profileForm)
  }

  getStudent(id: string) {
    if (id.length > 0) {
      this.http.get(`/students/${id}`)
        .subscribe((data) => { console.log('data', data); this.createProfile(data) })
    }
  }

  onDelete(id: string) {
    this.http.delete(`/students/${id}`)
      .subscribe(() =>
        this.profileForm.patchValue({
          name: [''],
          age: [null],
          grade: [null],
          picture: [''],
        })
      )
  }

  updateStudent(id: string, student: any) {
    console.log('student', student, id)
    this.http.put(`/students/${id}`, student)
      .subscribe((data) => console.log(data))
  }

  onSubmit(id: string) {
    const studentInfo = {
      name: this.profileForm.controls.name.value,
      age: this.profileForm.controls.age.value,
      grade: this.profileForm.controls.grade.value,
      imageUrl: this.profileForm.controls.picture.value,
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

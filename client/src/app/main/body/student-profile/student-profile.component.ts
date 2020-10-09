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
    console.log('deleting id:', id)
  }

  onSubmit(event: MouseEvent) {
    console.log('on submit event:', event)

  }

  ngOnChanges(changes): void {
    this.getStudent(changes.studentId.currentValue)
  }

  ngOnInit(): void {
    this.getStudent(this.studentId)
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  @Input() studentId: string

  constructor(private http: HttpClient) { }

  studentProfile: any = {}

  getStudent(id) {
    if (id.length > 0) {
      console.log('id:', id)
      this.http.get(`/students/${id}`)
        .subscribe((data) => console.log('got student', data))
    }
  }

  ngOnChanges(changes): void {
    this.getStudent(changes.studentId.currentValue)
  }

  ngOnInit(): void {
    this.getStudent(this.studentId)
  }

}

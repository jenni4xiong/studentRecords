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
    this.http.get(`/students/${id}`)
      .subscribe((data) => console.log(data))
  }

  ngOnChanges(changes): void {
    console.log('changes: ', changes)
  }

  ngOnInit(): void {
    this.getStudent(this.studentId)
  }

}

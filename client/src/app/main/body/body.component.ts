import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  studentId: string = '';

  selectStudent(id: string) {
    this.studentId = id;
    console.log('student id', this.studentId)
  }

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  studentId: string = '';
  shouldRerender: boolean = false;

  rerenderList(bool: boolean) {
    console.log('bool', bool)
    this.shouldRerender = true;
  }

  selectStudent(id: string) {
    this.studentId = id;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

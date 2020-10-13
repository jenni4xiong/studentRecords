import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  studentId: string = '';
  shouldRerender: boolean = false;

  toggleRerender(bool: boolean) {
    console.log('bool', bool)
    this.shouldRerender = bool;
  }

  selectStudent(id: string) {
    this.studentId = id;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

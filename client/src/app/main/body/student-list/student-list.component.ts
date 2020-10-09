import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList: any = [];
  studentId: string = '';
  page: number = 1;
  id: string = '';
  limit: number = 25;
  gradeOrder: number = 1;
  @Output() selectStudent = new EventEmitter<string>()

  constructor(private http: HttpClient) { }

  getStudentList(page: number, limit: number, sortOrder: any, order: any) {
    this.http.get(`/students?page=${page}&limit=${limit}&sortOrder=${sortOrder}&order=${order}`)
      .subscribe((data: any) => this.studentList = data.studentRecords)
  }

  sortGrade() {
    this.getStudentList(this.page, this.limit, 'grade', this.gradeOrder)
    if (this.gradeOrder === 1) this.gradeOrder = 0
    else this.gradeOrder = 1
  }

  handleStudentClick(data: any) {
    this.selectStudent.emit(data._id)
  }

  ngOnInit(): void {
    this.getStudentList(1, this.limit, null, null)
  }
}

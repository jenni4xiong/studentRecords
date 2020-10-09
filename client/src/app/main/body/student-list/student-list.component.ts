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
  @Output() selectStudent = new EventEmitter<string>()

  constructor(private http: HttpClient) { }

  getStudentList(page, limit, sortOrder) {
    this.http.get(`/students?page=${page}&limit=${limit}&sortOrder=${sortOrder}`)
      .subscribe((data: any) => this.studentList = data.studentRecords)
  }

  handleStudentClick(data: any) {
    this.selectStudent.emit(data._id)
  }

  ngOnInit(): void {
    this.getStudentList(1, 25, null)
  }
}

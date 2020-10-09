import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  TODO: get num count from header
        make get request when student is saved or deleted
        don't allow page to go past the last
*/

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
  nameOrder: number = 1;
  currentSort: any = null;
  @Input() shouldRerender: boolean
  @Output() selectStudent = new EventEmitter<string>()

  constructor(private http: HttpClient) { }

  getStudentList(page: number, limit: number, sortBy: any, order: any) {
    let sort;
    if (sortBy) {
      sort = `&sortBy=${sortBy}&order=${order}`
    } else {
      sort = ``
    }
    this.http.get(`/students?page=${page}&limit=${limit}${sort}`)
      .subscribe((data: any) => { this.studentList = data.studentRecords; })
  }

  sort(sort: string) {
    let order;
    if (sort === 'grade') {
      order = this.gradeOrder;
      this.currentSort = 'grade';
    } else {
      order = this.nameOrder;
      this.currentSort = 'name'
    }
    this.getStudentList(this.page, this.limit, sort, order);
    if (order === 1) {
      if (sort === 'grade') this.gradeOrder = -1;
      else this.nameOrder = -1
    }
    else {
      if (sort === 'grade') this.gradeOrder = 1;
      else this.nameOrder = 1;
    }
  }

  handleStudentClick(data: any) {
    this.selectStudent.emit(data._id)
  }

  handlePageClick(type: string) {
    let order;
    if (type === 'next') this.page += 1
    else {
      if (this.page > 1) this.page -= 1
    }
    if (this.currentSort === null) order = null
    else if (this.currentSort === 'name') order = 'name'
    else order = 'grade'

    console.log(this.page, this.limit, this.currentSort, order)
    this.getStudentList(this.page, this.limit, this.currentSort, order)
  }

  ngOnChanges(changes): void {
    let order;
    if (this.shouldRerender) {
      if (this.currentSort === null) order = null
      else if (this.currentSort === 'name') order = this.nameOrder
      else order = this.gradeOrder
      this.getStudentList(this.page, this.limit, this.currentSort, order)
    }
  }

  ngOnInit(): void {
    this.getStudentList(1, this.limit, null, null)
  }
}

import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  studentList: any = [];
  totalPages: number = 0;
  studentId: string = '';
  page: number = 1;
  id: string = '';
  limit: number = 15;
  gradeOrder: number;
  nameOrder: number;
  sortBy: any = null;
  @Input() shouldRerender: boolean
  @Output() selectStudent = new EventEmitter<string>()
  @Output() toggleRerender = new EventEmitter<boolean>()

  constructor(private http: HttpClient) { }

  getStudentList() {
    let order: any;
    if (this.sortBy === null) {
      order = null
    } else if (this.sortBy === 'name') {
      order = this.nameOrder
    } else {
      order = this.gradeOrder;
    }

    let sort: any;
    if (this.sortBy) {
      sort = `&sortBy=${this.sortBy}&order=${order}`
    } else {
      sort = ``
    }

    this.http.get(`/students?page=${this.page}&limit=${this.limit}${sort}`, { observe: 'response' })
      .subscribe((data) => {
        let totalCount: any;
        this.studentList = data.body.studentRecords;
        totalCount = parseInt(data.headers.get('x-total-count'))
        this.totalPages = Math.ceil(totalCount / this.limit)
        console.log('total pages', this.totalPages)
      })
  }

  sort(sort: string) {
    console.log('in sort')
    let order;
    if (sort === 'grade') {
      order = this.gradeOrder;
      this.sortBy = 'grade';
    } else {
      order = this.nameOrder;
      this.sortBy = 'name'
    }
    if (order === 1) {
      if (sort === 'grade') this.gradeOrder = -1;
      else this.nameOrder = -1
    }
    else {
      if (sort === 'grade') this.gradeOrder = 1;
      else this.nameOrder = 1;
    }
    this.getStudentList();
  }

  handleStudentClick(data: any) {
    this.selectStudent.emit(data._id)
  }

  handlePageClick(type: string) {
    if (type === 'next') this.page += 1
    else {
      if (this.page > 1) this.page -= 1
    }
    this.getStudentList()
  }

  ngOnChanges(changes): void {
    if (!changes.shouldRerender.previousValue && changes.shouldRerender.currentValue) {
      this.getStudentList()
      this.toggleRerender.emit(false);
    }
  }

  ngOnInit(): void {
    this.nameOrder = -1;
    this.gradeOrder = -1;
    this.getStudentList()
  }
}

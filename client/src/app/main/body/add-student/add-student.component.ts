import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  name: string;
  age: number;
  grade: number;
  imageUrl: string;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: '',
      age: null,
      grade: null,
      imageUrl: '',
    })
  }

  onSubmit() {

  }

  ngOnInit(): void {

  }

}

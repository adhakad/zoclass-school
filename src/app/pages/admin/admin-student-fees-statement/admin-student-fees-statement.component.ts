import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-student-fees-statement',
  templateUrl: './admin-student-fees-statement.component.html',
  styleUrls: ['./admin-student-fees-statement.component.css']
})
export class AdminStudentFeesStatementComponent implements OnInit {
  cls:any;
  rollNumber:any;
  constructor(public activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
    this.rollNumber = this.activatedRoute.snapshot.paramMap.get('rollnumber');
  }

}

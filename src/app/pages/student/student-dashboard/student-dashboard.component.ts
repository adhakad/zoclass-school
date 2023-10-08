import { Component, OnInit } from '@angular/core';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  studentInfo:any;
  studentResultCount:number=0;
  constructor(private studentAuthService: StudentAuthService) { }

  ngOnInit(): void {

    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
  }

}

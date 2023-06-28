import { Component, OnInit } from '@angular/core';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {
  studentInfo:any;
  constructor(private studentAuthService:StudentAuthService) { }

  ngOnInit(): void {
    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
  }

}

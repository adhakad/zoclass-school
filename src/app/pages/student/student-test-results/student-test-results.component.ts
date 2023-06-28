import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { TestResultService } from 'src/app/services/test-result.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-student-test-results',
  templateUrl: './student-test-results.component.html',
  styleUrls: ['./student-test-results.component.css']
})
export class StudentTestResultsComponent implements OnInit {
  studentInfo:any;
  studentResultInfo:any;
  percentile:any;
  testInfo:any;
  constructor(public activatedRoute:ActivatedRoute,private testResultService:TestResultService,private studentAuthService:StudentAuthService,private testService:TestService) { }

  ngOnInit(): void {
    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.studentSingleTestResult(id);
  }

  studentSingleTestResult(id:any){
    let params = {
      studentId:this.studentInfo?.id,
      testId:id
    }
    this.testResultService.studentSingleTestResult(params).subscribe((res:any) => {
      if(res){
        this.studentResultInfo = res;
        let id = this.studentResultInfo.testId;
        this.getSingleTest(id);
        let maxMarks = this.studentResultInfo?.correctAnswer + this.studentResultInfo?.inCorrectAnswer + this.studentResultInfo?.unAttempted;
        this.percentile = (this.studentResultInfo?.correctAnswer * 100 / maxMarks).toFixed(2);
      }
    })
  }

  getSingleTest(id: any) {
    this.testService.getSingleTestById(id).subscribe((res) => {
      if (res) {
        this.testInfo = res;
      }
    })
  }

}

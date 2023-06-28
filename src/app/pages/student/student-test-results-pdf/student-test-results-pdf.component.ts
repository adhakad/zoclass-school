import { Component, OnInit } from '@angular/core';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { TestResultService } from 'src/app/services/test-result.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-student-test-results-pdf',
  templateUrl: './student-test-results-pdf.component.html',
  styleUrls: ['./student-test-results-pdf.component.css']
})
export class StudentTestResultsPdfComponent implements OnInit {
  studentResultsInfo: any;
  studentInfo: any;
  testList: any;
  testInfo:any;
  constructor(private studentAuthService: StudentAuthService, private testResultService: TestResultService, private testService: TestService) { }

  ngOnInit(): void {
    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
    this.testByClass();
    this.resultsByStudent();
  }


  testByClass() {
    let cls = this.studentInfo?.class;
    this.testService.testByClass(cls).subscribe((res: any) => {
      if (res) {
        this.testList = res.testList;
      }
    })
  }
  resultsByStudent() {
    let studentId = this.studentInfo?.id
    this.testResultService.resultsByStudent(studentId).subscribe((res: any) => {
      if (res) {
        this.studentInfo = res.studentInfo;
        this.studentResultsInfo = res.studentResults;
        this.testList = this.testList.filter(({ _id: id1 }: any) => this.studentResultsInfo.some(({ testId: id2 }: any) => id2 === id1));
        this.testInfo = this.testList;
      }
    })
  }
}
import { Component, OnInit } from '@angular/core';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { TestResultService } from 'src/app/services/test-result.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  showModal: boolean = false;
  cls: any;
  newTestInfo: any;
  id: any;
  scheduleDate: any;
  startTiming: any;
  completeTiming: any;
  studentUserInfo: any;
  studentResultInfo: any;
  lastTestResultInfo: any;
  lastTestId: any;
  lastTestInfo: any;
  percentile: any;
  testAccessMsg=false;
  constructor(private studentAuthService: StudentAuthService, private testService: TestService, private testResultService: TestResultService) { }

  ngOnInit(): void {
    this.cls = this.studentAuthService.getLoggedInStudentInfo()?.class
    this.studentUserInfo = this.studentAuthService.getLoggedInStudentInfo();
    this.checkTestAccess();
  }

  checkTestAccess(){
    if (this.studentUserInfo) {
      this.checkStudentResult();
      this.resultsByStudent();
      return
    }
    this.testAccessMsg =true;
  }

  showModalPopup(id: any) {
    this.showModal = true;
    this.id = id;
  }

  resultsByStudent() {
    let id = this.studentUserInfo?.id;

    this.testResultService.resultsByStudent(id).subscribe((res: any) => {
      if (res) {
        let testResults = res.studentResults;
        let allCreatedDate = testResults.map((item: any) => { return item.createdDate });
        let maxCreatedDate = Math.max(...allCreatedDate);
        this.lastTestResultInfo = testResults.filter((item: any) => { return item.createdDate == maxCreatedDate });
        this.lastTestId = this.lastTestResultInfo[0].testId;
        this.getSingleTest(this.lastTestId);
        let maxMarks = this.lastTestResultInfo[0].correctAnswer + this.lastTestResultInfo[0]?.inCorrectAnswer + this.lastTestResultInfo[0]?.unAttempted;
        this.percentile = (this.lastTestResultInfo[0].correctAnswer * 100 / maxMarks).toFixed(2);
      }
    })
  }

  getSingleTest(id: any) {
    this.testService.getSingleTestById(id).subscribe((res) => {
      if (res) {
          this.lastTestInfo = res;
      }
    })
  }

  checkStudentResult() {
    let studentId = this.studentUserInfo?.id;
    this.testResultService.singleTestResult(studentId).subscribe((res: any) => {
      if (res) {
        this.studentResultInfo = res.studentResult.map((item: any) => { return item.testId });
        this.newTest();
      }
    })
  }

  newTest() {
    this.testService.getSingleTest(this.cls).subscribe((res) => {
      if (res) {
        let newTestId = res.testDetail._id;
        let checkTestId = this.studentResultInfo.filter((item: any) => { return item == newTestId })
        if (checkTestId.length > 0) {
          return
        }
        this.newTestInfo = res.testDetail;
        let newStartTime = this.newTestInfo.startTime * 1000;
        let newEndTime = this.newTestInfo.endTime * 1000
        this.scheduleDate = new Date(newStartTime).toLocaleString("en-US", {
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          day: 'numeric',
          month: 'long',
        })
        this.startTiming = new Date(newStartTime).toLocaleString("en-US", {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
        })
        this.completeTiming = new Date(newEndTime).toLocaleString("en-US", {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
        })
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-student-test',
  templateUrl: './student-test.component.html',
  styleUrls: ['./student-test.component.css']
})
export class StudentTestComponent implements OnInit {
  showModal: boolean = false;
  showAddTestModal: boolean = false;
  showAddQuestionModal: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  testId: any;
  totalQuestion: number = 0;
  fields: any;
  arr: any[] = [];
  addTestQuestions: number[] = [];
  testInfo: any[] = [];
  allClass: any[] = [];
  allSubject: any[] = [];
  totalQuestions: any[] = [];
  durations: any[] = [];

  recordLimit: number = 5;
  filters: any = {};
  number: number = 0;
  scheduleDate: any;
  startTiming: any;
  completeTiming: any;
  timeNow: any;
  studentInfo:any;

  paginationValues: Subject<any> = new Subject();
  constructor(private testService: TestService, private studentAuthService: StudentAuthService) { }

  ngOnInit(): void {
    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
    let cls = this.studentInfo?.class;
    this.getTest(cls);
  }

  getTest(cls: any) {
    this.testService.testByClass(cls).subscribe((res: any) => {
      if (res) {
        this.testInfo = res.testList;
        this.timeNow = res?.timeNow;
        let newArray = this.testInfo.map((item) => { return { startTime: item.startTime, endTime: item.endTime } });
        for (let i = 0; i < newArray.length; i++) {
          let startTime = this.testInfo[i].startTime * 1000;
          let endTime = this.testInfo[i].endTime * 1000;
          this.scheduleDate = new Date(startTime).toLocaleString("en-US", {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            day: 'numeric',
            month: 'long',
          })
          this.startTiming = new Date(startTime).toLocaleString("en-US", {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
          })
          this.completeTiming = new Date(endTime).toLocaleString("en-US", {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
          })
          this.testInfo[i].scheduleDate = this.scheduleDate;
          this.testInfo[i].startTiming = this.startTiming;
          this.testInfo[i].completeTiming = this.completeTiming;
        }
      }
    }, error => {
      console.log(error.error)
    });
  }

}
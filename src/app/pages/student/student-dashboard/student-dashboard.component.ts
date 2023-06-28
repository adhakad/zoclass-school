import { Component, OnInit } from '@angular/core';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { TestResultService } from 'src/app/services/test-result.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  studentInfo:any;
  subjectCount:number=0;
  testCount:number=0;
  studentResultCount:number=0;
  constructor(private studentAuthService: StudentAuthService,private classSubjectService:ClassSubjectService,private testService:TestService,private testResultService:TestResultService) { }

  ngOnInit(): void {

    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
    this.subjectByClass();
    this.testByClass();
    this.resultsByStudent();
  }

  subjectByClass(){
    let cls = this.studentInfo?.class;
    this.classSubjectService.getSubjectByClass(cls).subscribe((res:any)=>{
      if(res){
        this.subjectCount = res.length;
        console.log(this.subjectCount);
      }
    })
  }
  testByClass(){
    let cls = this.studentInfo?.class;
    this.testService.testByClass(cls).subscribe((res:any)=>{
      if(res){
        this.testCount = res.testList.length;
      }
    })
  }
  resultsByStudent() {
    let studentId = this.studentInfo?.id
    this.testResultService.resultsByStudent(studentId).subscribe((res: any) => {
      if (res) {
        this.studentResultCount = res.studentResults.length;
      }
    })
  }

}

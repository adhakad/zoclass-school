import { Component, OnInit } from '@angular/core';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { ClassSubjectService } from 'src/app/services/class-subject.service';

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
  constructor(private studentAuthService: StudentAuthService,private classSubjectService:ClassSubjectService) { }

  ngOnInit(): void {

    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
    this.subjectByClass();
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

}

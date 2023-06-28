import { Component, OnInit } from '@angular/core';
import { TeacherAuthService } from 'src/app/services/auth/teacher-auth.service';
import { StudentService } from 'src/app/services/student.service';
import { StudyMaterialService } from 'src/app/services/study-material.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  
  studentCountInfo:any;
  studyMaterialCountInfo:any;
  testCountInfo:any;
  subjectCountInfo:any;
  constructor(private teacherAuthService:TeacherAuthService,private studentService:StudentService,private testService:TestService,private studyMaterialService:StudyMaterialService,private subjectService:SubjectService) { }

  ngOnInit(): void {
    let userDetail = this.teacherAuthService.getLoggedInTeacherInfo()
    
    this.studentCount();
    this.studyMaterialCount();
    this.testCount();
    this.subjectCount();
  }
  studentCount(){
    this.studentService.getStudentCount().subscribe((res:any)=> {
      this.studentCountInfo = res.countStudent;
    })
  }
  studyMaterialCount(){
    this.studyMaterialService.getStudyMaterialCount().subscribe((res:any)=> {
      this.studyMaterialCountInfo = res.countStudyMaterial;
    })
  }
  testCount(){
    this.testService.getTestCount().subscribe((res:any)=> {
      this.testCountInfo = res.countTest;
    })
  }
  subjectCount(){
    this.subjectService.getSubjectCount().subscribe((res:any)=> {
      this.subjectCountInfo = res.countSubject;
    })
  }
}

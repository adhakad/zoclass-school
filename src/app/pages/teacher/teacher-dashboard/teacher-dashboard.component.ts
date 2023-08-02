import { Component, OnInit } from '@angular/core';
import { TeacherAuthService } from 'src/app/services/auth/teacher-auth.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

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
  constructor(private teacherAuthService:TeacherAuthService,private studentService:StudentService,private subjectService:SubjectService) { }

  ngOnInit(): void {
    let userDetail = this.teacherAuthService.getLoggedInTeacherInfo()
    
    this.studentCount();
    this.subjectCount();
  }
  studentCount(){
    this.studentService.getStudentCount().subscribe((res:any)=> {
      this.studentCountInfo = res.countStudent;
    })
  }
  subjectCount(){
    this.subjectService.getSubjectCount().subscribe((res:any)=> {
      this.subjectCountInfo = res.countSubject;
    })
  }
}

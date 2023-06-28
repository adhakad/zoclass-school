import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Subject } from 'rxjs';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { SubjectService } from 'src/app/services/subject.service';


@Component({
  selector: 'app-student-subject',
  templateUrl: './student-subject.component.html',
  styleUrls: ['./student-subject.component.css']
})
export class StudentSubjectComponent implements OnInit {
  studentInfo: any;
  subjectInfo: any;
  classSubjectInfo: any;
  recordLimit: number = 5;
  filters: any = {};
  number: number = 0;
  paginationValues: Subject<any> = new Subject();
  constructor(private studentAuthService: StudentAuthService, private classSubjectService: ClassSubjectService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
    this.subjectByClass();
  }

  subjectByClass() {
    let cls = this.studentInfo.class;
    this.classSubjectService.getSubjectByClass(cls).subscribe((res) => {
      if (res) {
        this.classSubjectInfo = res;
        this.getSubjectList();
      }
    })
  }

  getSubjectList() {
    this.subjectService.getSubjectList().subscribe((res: any) => {
      if (res) {
        let subject = res;
        if(this.classSubjectInfo){
          this.subjectInfo = subject.filter(({ subject: subject1 }: any) => this.classSubjectInfo.some(({ subject: subject2 }: any) => subject1 === subject2));
        }
      }
    })
  }

}
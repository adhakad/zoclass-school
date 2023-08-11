import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AdmitCardStructureService } from 'src/app/services/admit-card-structure.service';
import { AdmitCardService } from 'src/app/services/admit-card.service';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { SubjectService } from 'src/app/services/subject.service';


@Component({
  selector: 'app-student-admit-card',
  templateUrl: './student-admit-card.component.html',
  styleUrls: ['./student-admit-card.component.css']
})
export class StudentAdmitCardComponent implements OnInit {
  studentInfo: any;
  subjectInfo: any;
  classSubjectInfo: any;
  recordLimit: number = 5;
  filters: any = {};
  number: number = 0;
  paginationValues: Subject<any> = new Subject();
  studentAdmitCardInfo:any;
  admitCardInfo:any;
  


  // admitCardInfo = [
  //   {
  //     class:10,
  //     examDate: {
  //       maths: "30/09/2023",
  //       science: "03/08/2023",
  //     },
  //     examStartTime: {
  //       maths: "8:00 AM",
  //       science: "9:30 AM",
  //     },
  //     examEndTime: {
  //       maths: "9:00 AM",
  //       science: "11:00 AM",
  //     },
  //   }
  // ];

  processedData: any[] = [];



  constructor(private studentAuthService: StudentAuthService, private admitCardStructureService:AdmitCardStructureService,private admitCardService:AdmitCardService) { }

  ngOnInit(): void {
    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
    let studentId = this.studentInfo?.id;
    this.singleStudentAdmitCardById(studentId);
    this.getAdmitCardByClass();
  }

  getAdmitCardByClass() {
    let cls = this.studentInfo.class;
    this.admitCardStructureService.admitCardStructureByClass(cls).subscribe((res:any) => {
      if (res) {
        this.admitCardInfo = res;
        console.log(res)
        this.processData();
        
      }
    })
  }
  


    processData() {
      for (let i = 0; i < this.admitCardInfo[0].examDate.length; i++) {
        const subject = Object.keys(this.admitCardInfo[0].examDate[i])[0];
        const date = Object.values(this.admitCardInfo[0].examDate[i])[0];
        const startTime = Object.values(this.admitCardInfo[0].examStartTime[i])[0];
        const endTime = Object.values(this.admitCardInfo[0].examEndTime[i])[0];
  
        this.processedData.push({
          subject,
          date,
          timing: `${startTime} to ${endTime}`
        });
      }
    }
  
  singleStudentAdmitCardById(id:any){
    this.admitCardService.singleStudentAdmitCardById(id).subscribe((res:any) => {
      if(res){
        this.studentAdmitCardInfo = res;
        console.log(res)
      }
    })
  }

}

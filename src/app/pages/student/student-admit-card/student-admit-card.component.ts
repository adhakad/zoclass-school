import { Component,ElementRef, ViewChild, OnInit } from '@angular/core';
import { AdmitCardService } from 'src/app/services/admit-card.service';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { PrintPdfService } from 'src/app/services/print-pdf/print-pdf.service';

@Component({
  selector: 'app-student-admit-card',
  templateUrl: './student-admit-card.component.html',
  styleUrls: ['./student-admit-card.component.css']
})
export class StudentAdmitCardComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  errorMsg: string = '';
  studentAdmitCardInfo: any;
  studentInfo: any;
  admitCardInfo: any;
  processedData: any[] = [];

  constructor(private studentAuthService: StudentAuthService,private printPdfService: PrintPdfService, private admitCardService: AdmitCardService) {}
  ngOnInit(): void {
    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
    let studentId = this.studentInfo?.id;
    this.admitCard(studentId);
  }

  printContent() {
    this.printPdfService.printElement(this.content.nativeElement);
  }

  downloadPDF() {
    this.printPdfService.generatePDF(this.content.nativeElement, "Admitcard.pdf");
  }

  
  admitCard(studentId:any) {
    console.log(studentId)
    this.admitCardService.singleStudentAdmitCardById(studentId).subscribe((res: any) => {
      if (res) {
        if (!this.processedData || !this.studentAdmitCardInfo || !this.admitCardInfo) {
          this.studentAdmitCardInfo = {...res.admitCard,...res.student};
          this.admitCardInfo = res.admitCardStructure;
          this.processData();
        }

      }
    }, err => {
      this.errorMsg = err.error.errorMsg;
    })
  }
  processData() {
    for (let i = 0; i < this.admitCardInfo.examDate.length; i++) {
      const subject = Object.keys(this.admitCardInfo.examDate[i])[0];
      const date = Object.values(this.admitCardInfo.examDate[i])[0];
      const startTime = Object.values(this.admitCardInfo.examStartTime[i])[0];
      const endTime = Object.values(this.admitCardInfo.examEndTime[i])[0];

      this.processedData.push({
        subject,
        date,
        timing: `${startTime} to ${endTime}`
      });
    }
  }


}

import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeesStructureService } from 'src/app/services/fees-structure.service';
import { FeesService } from 'src/app/services/fees.service';
import { PrintPdfService } from 'src/app/services/print-pdf/print-pdf.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-student-fees-statement',
  templateUrl: './student-fees-statement.component.html',
  styleUrls: ['./student-fees-statement.component.css']
})
export class StudentFeesStatementComponent implements OnInit {

  @ViewChild('content') content!: ElementRef;
  @ViewChild('receipt') receipt!: ElementRef;
  cls: any;
  showModal:boolean = false;
  clsFeesStructure: any;
  studentFeesCollection: any;
  studentId: any;
  processedData: any[] = [];
  singleReceiptInstallment:any[] = [];
  studentInfo:any[]=[];
  schoolInfo:any;
  constructor(public activatedRoute: ActivatedRoute,private schoolService:SchoolService, private printPdfService: PrintPdfService, private feesService: FeesService, private feesStructureService: FeesStructureService) { }

  ngOnInit(): void {
    this.getSchool();
    this.cls = this.activatedRoute.snapshot.paramMap.get('class');
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.singleStudentFeesCollectionById(this.studentId)
    this.feesStructureByClass(this.cls)
  }
  getSchool(){
    this.schoolService.getSchool().subscribe((res:any)=> {
      if(res){
        this.schoolInfo = res;
      }
    })
  }
  printContent() {
    this.printPdfService.printElement(this.content.nativeElement);
  }

  downloadPDF() {
    this.printPdfService.generatePDF(this.content.nativeElement, "Fee-statement.pdf");
  }
  printReceipt() {
    this.printPdfService.printElement(this.receipt.nativeElement);
  }

  downloadReceiptPDF() {
    this.printPdfService.generatePDF(this.receipt.nativeElement, "Fee-receipt.pdf");
  }
  closeModal() {
    this.showModal = false;
    
  }
  feeReceipt(singleInstallment:any) {
    const data:any = this.processedData
    const desiredInstallment = singleInstallment;
    this.singleReceiptInstallment = Object.values(data).filter((item:any) => item.installment === desiredInstallment);
    this.showModal = true;

  }
  singleStudentFeesCollectionById(studentId: any) {
    this.feesService.singleStudentFeesCollectionById(studentId).subscribe((res: any) => {
      if (res) {
        this.studentFeesCollection = res.studentFeesCollection;
        this.studentInfo = res.studentInfo;
        console.log(this.studentInfo)
        this.processData();
      }
    })
  }

  feesStructureByClass(cls: any) {
    this.feesStructureService.feesStructureByClass(cls).subscribe((res: any) => {
      if (res) {
        this.clsFeesStructure = res;
        
      }
    })
  }

  processData() {
    for (let i = 0; i < this.studentFeesCollection.installment.length; i++) {
      const receiptNo = Object.values(this.studentFeesCollection.receipt[i])[0];
      const installment = Object.keys(this.studentFeesCollection.installment[i])[0];
      const paidAmount = Object.values(this.studentFeesCollection.installment[i])[0];
      const paymentDate = Object.values(this.studentFeesCollection.paymentDate[i])[0];

      this.processedData.push({
        receiptNo,
        installment,
        paidAmount,
        paymentDate
      });
    }
  }
}

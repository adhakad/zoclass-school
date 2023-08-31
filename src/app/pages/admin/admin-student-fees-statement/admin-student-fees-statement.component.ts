import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeesStructureService } from 'src/app/services/fees-structure.service';
import { FeesService } from 'src/app/services/fees.service';
import { PrintPdfService } from 'src/app/services/print-pdf/print-pdf.service';

@Component({
  selector: 'app-admin-student-fees-statement',
  templateUrl: './admin-student-fees-statement.component.html',
  styleUrls: ['./admin-student-fees-statement.component.css']
})
export class AdminStudentFeesStatementComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  @ViewChild('receipt') receipt!: ElementRef;
  cls: any;
  showModal:boolean = false;
  clsFeesStructure: any;
  studentFeesCollection: any;
  rollNumber: any;
  processedData: any[] = [];
  singleReceiptStallment:any[] = [];
  constructor(public activatedRoute: ActivatedRoute, private printPdfService: PrintPdfService, private feesService: FeesService, private feesStructureService: FeesStructureService) { }

  ngOnInit(): void {
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
    this.rollNumber = this.activatedRoute.snapshot.paramMap.get('rollnumber');
    this.singleStudentFeesCollection(this.cls, this.rollNumber)
    this.feesStructureByClass(this.cls)
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
  feeReceipt(singleStallment:any) {
    const data:any = this.processedData

    const desiredStallment = singleStallment;

    this.singleReceiptStallment = Object.values(data).filter((item:any) => item.stallment === desiredStallment);
    console.log(this.singleReceiptStallment)
    this.showModal = true;

  }
  singleStudentFeesCollection(cls: any, rollNumber: any) {
    this.feesService.singleStudentFeesCollection(cls, rollNumber).subscribe((res: any) => {
      if (res) {
        this.studentFeesCollection = res;
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
    for (let i = 0; i < this.studentFeesCollection.stallment.length; i++) {
      const receiptNo = Object.values(this.studentFeesCollection.receipt[i])[0];
      const stallment = Object.keys(this.studentFeesCollection.stallment[i])[0];
      const paidAmount = Object.values(this.studentFeesCollection.stallment[i])[0];
      const paymentDate = Object.values(this.studentFeesCollection.paymentDate[i])[0];

      this.processedData.push({
        receiptNo,
        stallment,
        paidAmount,
        paymentDate
      });
    }
  }

}

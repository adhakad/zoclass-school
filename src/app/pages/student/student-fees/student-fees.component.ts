import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
declare var Razorpay: any;
import { Router } from '@angular/router';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { FeesStructureService } from 'src/app/services/fees-structure.service';
import { FeesService } from 'src/app/services/fees.service';
import { PrintPdfService } from 'src/app/services/print-pdf/print-pdf.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-student-fees',
  templateUrl: './student-fees.component.html',
  styleUrls: ['./student-fees.component.css']
})
export class StudentFeesComponent implements OnInit {
  errorMessage: String = '';
  successMessage: String = '';
  cls: any;
  studentInfo: any;
  clsFeesStructure: any;
  studentFeesCollection: any;
  rollNumber: any;
  paybleInstallment: any[] = [];
  check: boolean = false;
  constructor(private router: Router,private paymentService: PaymentService, private studentAuthService: StudentAuthService, private printPdfService: PrintPdfService, private feesService: FeesService, private feesStructureService: FeesStructureService) { }

  ngOnInit(): void {
    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
    this.cls = this.studentInfo.class;
    this.rollNumber = this.studentInfo.rollNumber;
    this.feesStructureByClass(this.cls);
  }

  feesStructureByClass(cls: any) {
    this.feesStructureService.feesStructureByClass(cls).subscribe((res: any) => {
      if (res) {
        this.singleStudentFeesCollection(this.cls, this.rollNumber);
        this.clsFeesStructure = res;
      }
    })
  }
  singleStudentFeesCollection(cls: any, rollNumber: any) {
    this.feesService.singleStudentFeesCollection(cls, rollNumber).subscribe((res: any) => {
      if (res) {
        this.studentFeesCollection = res;
        const installment = this.studentFeesCollection.installment;
        const result = installment.find((installment: any) => {
          const [key, value] = Object.entries(installment)[0];
          return value === 0;
        });
        if (this.clsFeesStructure && result) {
          let installmentName = Object.keys(result)[0];
          this.paybleInstallment = this.clsFeesStructure.installment.filter((item: any) => item[installmentName])
          this.check = true;
        }
        this.check = true;
      }
    })
  }
  successDone() {
    setTimeout(() => {
      console.log("abcd")
      this.successMessage = 'ABCD';

    }, 1000)
  }
  createPayment() {
    const studentId = this.studentInfo.id;
    const cls = this.studentInfo.class;
    const rollNumber = this.studentInfo.rollNumber;
    const feesInstallment = Object.keys(this.paybleInstallment[0])[0];
    const feesAmount = Object.values(this.paybleInstallment[0])[0];
    const currency = 'INR';
    const paymentData = { studentId: studentId, cls: cls, rollNumber: rollNumber, feesInstallment: feesInstallment, feesAmount: feesAmount, currency: currency };
    this.paymentService.createPayment(paymentData).subscribe(
      (response: any) => {
        const options = {
          key: 'rzp_test_ARoUa9Hxw3scSz',
          amount: response.order.feesAmount,
          currency: response.order.currency,
          name: 'Vandana Convent School',
          description: 'Payment for Your Product',
          image: '../../../../assets/logo.png',
          prefill: {
            name: this.studentInfo.name,
            email: this.studentInfo.email,
            contact: '9340700360',
            method: 'online'
          },
          theme: {
            color: '#8b69f2',
          },
          order_id: response.order.id,
          handler: this.paymentHandler.bind(this),
        };
        Razorpay.open(options);
        this.paybleInstallment=["abc"];
      },
      (error) => {
        this.errorMessage = 'Payment creation failed. Please try again later.';
      }
    );
  }

  paymentHandler(response: any) {
    const razorpayPaymentId = response.razorpay_payment_id;
    const razorpayOrderId = response.razorpay_order_id;
    const razorpaySignature = response.razorpay_signature;
    const paymentData = {
      payment_id: razorpayPaymentId,
      order_id: razorpayOrderId,
      signature: razorpaySignature
    }
    this.paymentService.validatePayment(paymentData).subscribe((validationResponse: any) => {
      if (validationResponse) {
        this.successMessage = validationResponse.message;
      }
    },
      (validationError: any) => {
        this.errorMessage = 'Payment validation failed. Please contact support.';
      }
    );
  }
}
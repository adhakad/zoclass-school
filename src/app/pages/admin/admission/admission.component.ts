import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { ClassService } from 'src/app/services/class.service';
import { FeesStructureService } from 'src/app/services/fees-structure.service';
import { PrintPdfService } from 'src/app/services/print-pdf/print-pdf.service';
import { SchoolService } from 'src/app/services/school.service';


@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
  @ViewChild('receipt') receipt!: ElementRef;
  studentForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  classInfo: any[] = [];
  studentInfo: any[] = [];
  recordLimit: number = 10;
  filters: any = {};
  number: number = 0;
  paginationValues: Subject<any> = new Subject();
  page: Number = 0;

  sessions: any;
  categorys: any;
  religions: any;
  qualifications: any;
  occupations: any;
  stream: string = '';
  notApplicable: String = "stream";
  streamMainSubject: any[] = ['Mathematics(Science)', 'Biology(Science)', 'History(Arts)', 'Sociology(Arts)', 'Political Science(Arts)', 'Accountancy(Commerce)', 'Economics(Commerce)'];
  cls: number = 0;
  rollNumberType: string = '';
  admissionFeesPaymentType: string = '';
  clsFeesStructure: any;
  schoolInfo: any;
  admissionrReceiptInfo: any;
  receiptMode: boolean = false;
  loader:Boolean=true;
  constructor(private fb: FormBuilder, private schoolService: SchoolService, private printPdfService: PrintPdfService, private classService: ClassService, private studentService: StudentService, private feesStructureService: FeesStructureService) {
    this.studentForm = this.fb.group({
      _id: [''],
      session: ['', Validators.required],
      admissionNo: ['', Validators.required],
      class: ['', Validators.required],
      stream: ['', Validators.required],
      admissionFees: ['', Validators.required],
      admissionFeesPaymentType: ['', Validators.required],
      rollNumberType: ['', Validators.required],
      rollNumber: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      category: ['', Validators.required],
      religion: ['', Validators.required],
      nationality: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      lastSchool: [''],
      fatherName: ['', Validators.required],
      fatherQualification: ['', Validators.required],
      fatherOccupation: ['', Validators.required],
      fatherContact: ['', Validators.required],
      fatherAnnualIncome: ['', Validators.required],
      motherName: ['', Validators.required],
      motherQualification: ['', Validators.required],
      motherOccupation: ['', Validators.required],
      motherContact: ['', Validators.required],
      motherAnnualIncome: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getSchool();
    let load:any = this.getStudentsByAdmission({ page: 1 });
    this.getClass();
    this.allOptions();
    if(load){
      setTimeout(()=>{
        this.loader = false;
      },1000);
    }
  }
  printReceipt() {
    this.printPdfService.printElement(this.receipt.nativeElement);
    this.closeModal();
  }
  getSchool() {
    this.schoolService.getSchool().subscribe((res: any) => {
      if (res) {
        this.schoolInfo = res;
      }
    })
  }
  chooseClass(event: any) {
    if (event) {
      if (this.stream) {
        this.studentForm.get('stream')?.setValue(null);
      }
      this.cls = event.value;
      if (this.cls) {
        const cls = this.cls;
        this.feesStructureByClass(cls);
      }
    }
  }
  chooseStream(event: any) {
    this.stream = event.value;
  }
  feesStructureByClass(cls: any) {
    this.feesStructureService.feesStructureByClass(cls).subscribe((res: any) => {
      if (res) {
        res.feesType = [{Admission:res.admissionFees},...res.feesType];
        this.clsFeesStructure = res;
      }
    })
  }

  chooseAdmissionFeesPayment(event: any) {
    if (event) {
      if (event.value == 'Immediate') {
        this.admissionFeesPaymentType = event.value;
        const admissionFees = this.clsFeesStructure?.admissionFees;
        this.studentForm.get('admissionFees')?.setValue(admissionFees);

      }
      if (event.value == 'Later') {
        this.admissionFeesPaymentType = event.value;
        const admissionFees = 0;
        this.studentForm.get('admissionFees')?.setValue(admissionFees);
      }
    }
  }
  chooseRollNumberType(event: any) {
    if (event) {
      if (event.value == 'generate') {
        this.rollNumberType = event.value;
        const rollNumber = Math.floor(Math.random() * 89999999 + 10000000);
        this.studentForm.get('rollNumber')?.setValue(rollNumber);

      }
      if (event.value == 'manualFill') {
        this.rollNumberType = event.value;
        this.studentForm.get('rollNumber')?.setValue(null);
      }
    }
  }

  date(e: any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dob')?.setValue(convertDate, {
      onlyself: true,
    });
  }

  closeModal() {
    this.showModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
    this.stream = '';
    this.cls = 0;
    this.rollNumberType = '';
    this.receiptMode = false;
    this.admissionrReceiptInfo;
    this.studentForm.reset();
  }
  addStudentModel() {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = false;
    this.studentForm.reset();
    const admissionNo = Math.floor(Math.random() * 89999999 + 10000000);
    this.studentForm.get('admissionNo')?.setValue(admissionNo);
  }
  updateStudentModel(student: any) {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = true;
    this.studentForm.patchValue(student);
  }
  deleteStudentModel(id: String) {
    this.showModal = true;
    this.updateMode = false;
    this.deleteMode = true;
    this.deleteById = id;
  }

  getClass() {
    this.classService.getClassList().subscribe((res: any) => {
      if (res) {
        this.classInfo = res;
      }
    })
  }
  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getStudentsByAdmission({ page: this.page });
    }, 1000)
  }

  getStudentsByAdmission($event: any) {
    this.page = $event.page
    return new Promise((resolve, reject) => {
      let params: any = {
        filters: {},
        page: $event.page,
        limit: $event.limit ? $event.limit : this.recordLimit
      };
      this.recordLimit = params.limit;
      if (this.filters.searchText) {
        params["filters"]["searchText"] = this.filters.searchText.trim();
      }

      this.studentService.studentPaginationByAdmission(params).subscribe((res: any) => {
        if (res) {
          this.studentInfo = res.studentList;
          this.number = params.page;
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.countStudent });
          return resolve(true);
        }
      });
    });
  }

  studentAddUpdate() {
    if (this.studentForm.valid) {
      // if (this.updateMode) {
      //   this.studentService.updateStudent(this.studentForm.value).subscribe((res: any) => {
      //     if (res) {
      //       this.successDone();
      //       this.successMsg = res;
      //     }
      //   }, err => {
      //     this.errorCheck = true;
      //     this.errorMsg = err.error;
      //   })
      // } else {
      this.studentForm.value.admissionType = 'New';
      this.studentService.addStudent(this.studentForm.value).subscribe((res: any) => {
        if (res) {
          if (res.studentAdmissionData.admissionType == "New" && res.studentAdmissionData.admissionFeesPaymentType == 'Immediate') {
            this.receiptMode = true;
            this.admissionrReceiptInfo = res.studentAdmissionData;
          }
          if (res.studentAdmissionData.admissionType == "New" && res.studentAdmissionData.admissionFeesPaymentType == 'Later') {
            this.successDone();
            this.successMsg = res.successMsg;
          }
        }
      }, err => {
        this.errorCheck = true;
        this.errorMsg = err.error;
      })
    }
    // }
  }

  allOptions() {
    this.sessions = [{ year: '2023-24' }, { year: '2024-25' }, { year: '2025-26' }, { year: '2026-27' }, { year: '2027-28' }, { year: '2028-29' }, { year: '2029-30' }]
    this.categorys = [{ category: 'General' }, { category: 'OBC' }, { category: 'SC' }, { category: 'ST' }, { category: 'Other' }]
    this.religions = [{ religion: 'Hinduism' }, { religion: 'Buddhism' }, { religion: 'Christanity' }, { religion: 'Jainism' }, { religion: 'Sikhism' }, { religion: 'Other' }]
    this.qualifications = [{ qualification: 'Doctoral Degree' }, { qualification: 'Masters Degree' }, { qualification: 'Graduate Diploma' }, { qualification: 'Graduate Certificate' }, { qualification: 'Graduate Certificate' }, { qualification: 'Bachelor Degree' }, { qualification: 'Advanced Diploma' }, { qualification: 'Primary School' }, { qualification: 'High School' }, { qualification: 'Higher Secondary School' }, { qualification: 'Illiterate' }, { qualification: 'Other' }]
    this.occupations = [{ occupation: 'Agriculture(Farmer)' }, { occupation: 'Laborer' }, { occupation: 'Self Employed' }, { occupation: 'Private Job' }, { occupation: 'State Govt. Employee' }, { occupation: 'Central Govt. Employee' }, { occupation: 'Military Job' }, { occupation: 'Para-Military Job' }, { occupation: 'PSU Employee' }, { occupation: 'Other' }]
  }
}

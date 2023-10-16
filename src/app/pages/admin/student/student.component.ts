import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { read, utils, writeFile } from 'xlsx';
// import * as ExcelJS from 'exceljs';
import { Subject } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { ClassService } from 'src/app/services/class.service';
import { MatRadioChange } from '@angular/material/radio';
import { ExcelService} from 'src/app/services/excel/excel.service';
import { SchoolService } from 'src/app/services/school.service';
// export interface ROW_ITEM {
//   NO:Number;
//   ID: number;
//   NAME: string;
//   DEPARTMENT: string;
//   MONTH: string;
//   YEAR: number;
//   SALES: number;
//   CHANGE: number;
//   LEADS: number;
// }

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentForm: FormGroup;
  showModal: boolean = false;
  showBulkImportModal: boolean = false;
  showBulkExportModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  classInfo: any[] = [];
  studentInfo: any[] = [];
  studentInfoByClass: any[] = [];
  recordLimit: number = 10;
  filters: any = {};
  number: number = 0;
  paginationValues: Subject<any> = new Subject();
  page: Number = 0;
  selectedValue: number = 0;

  sessions: any;
  categorys: any;
  religions: any;
  qualifications: any;
  occupations: any;
  stream: string = '';
  notApplicable: String = "stream";
  streamMainSubject: any[] = ['Mathematics(Science)', 'Biology(Science)', 'History(Arts)', 'Sociology(Arts)', 'Political Science(Arts)', 'Accountancy(Commerce)', 'Economics(Commerce)'];
  cls: number = 0;
  className: any;
  admissionType: string = '';
  schoolInfo:any;

  dataForExcel: any[] = [];

  constructor(private fb: FormBuilder,private schoolService:SchoolService,public ete: ExcelService, public activatedRoute: ActivatedRoute, private classService: ClassService, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      _id: [''],
      session: ['', Validators.required],
      admissionType: ['', Validators.required],
      class: ['', Validators.required],
      rollNumber: ['', Validators.required],
      stream: ['', Validators.required],
      admissionNo: ['', Validators.required],
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
    this.className = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.className) {
      this.getStudents({ page: 1 });
    }
    this.getSchool();
    this.getClass();
    this.allOptions();
  }
  getSchool(){
    this.schoolService.getSchool().subscribe((res:any)=>{
      if(res){
        this.schoolInfo = res;
      }
    })
  }
  chooseAdmissionType(event: any) {
    if (event) {
      if (event.value == 'new') {
        this.admissionType = event.value;
        const admissionNo = Math.floor(Math.random() * 89999999 + 10000000);
        this.studentForm.get('admissionNo')?.setValue(admissionNo);
      }
      if (event.value == 'old') {
        this.admissionType = event.value;
        this.studentForm.get('admissionNo')?.setValue(null);
      }
    }
  }
  chooseClass(event: any) {
    if (event) {
      if (this.stream) {
        this.studentForm.get('stream')?.setValue(null);
      }
      this.cls = event.value;
    }
  }
  chooseStream(event: any) {
    this.stream = event.value;
  }

  date(e: any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dob')?.setValue(convertDate, {
      onlyself: true,
    });
  }
  onChange(event: MatRadioChange) {
    this.selectedValue = event.value;
  }
  closeModal() {
    this.showModal = false;
    this.showBulkImportModal = false;
    this.showBulkExportModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
    this.stream = '';
    this.cls = 0;
    this.admissionType = '';
    this.studentForm.reset();
  }
  addStudentModel() {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = false;
    this.studentForm.reset();
  }
  addBulkStudentImportModel() {
    this.showBulkImportModal = true;
    this.errorCheck = false;
  }
  addBulkStudentExportModel() {
    this.showBulkExportModal = true;
    this.errorCheck = false;
    this.getStudentByClass(this.className);
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
      this.getStudents({ page: this.page });
    }, 1000)
  }

  getStudentByClass(cls:any){
    this.studentService.getStudentByClass(cls).subscribe((res:any)=> {
      if(res){
        this.studentInfoByClass = res;
        console.log([...this.studentInfoByClass])
      }
    })
  }
  getStudents($event: any) {
    this.page = $event.page
    return new Promise((resolve, reject) => {
      let params: any = {
        filters: {},
        page: $event.page,
        limit: $event.limit ? $event.limit : this.recordLimit,
        class: this.className
      };
      this.recordLimit = params.limit;
      if (this.filters.searchText) {
        params["filters"]["searchText"] = this.filters.searchText.trim();
      }

      this.studentService.studentPaginationList(params).subscribe((res: any) => {
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
      if (this.updateMode) {
        this.studentService.updateStudent(this.studentForm.value).subscribe((res: any) => {
          if (res) {
            this.successDone();
            this.successMsg = res;
          }
        }, err => {
          this.errorCheck = true;
          this.errorMsg = err.error;
        })
      } else {
        this.studentService.addStudent(this.studentForm.value).subscribe((res: any) => {
          if (res) {
            this.successDone();
            this.successMsg = res;
          }
        }, err => {
          this.errorCheck = true;
          this.errorMsg = err.error;
        })
      }
    }
  }
  changeStatus(id: any, statusValue: any) {
    if (id) {
      let params = {
        id: id,
        statusValue: statusValue,
      }
      this.studentService.changeStatus(params).subscribe((res: any) => {
        if (res) {
          this.getStudents({ page: this.page });
        }
      })
    }
  }
  studentDelete(id: String) {
    this.studentService.deleteStudent(id).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
        this.deleteById = '';
      }
    })
  }


  exportToExcel() {
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let currentYear = (new Date()).getFullYear();
    let currentMonth = (new Date()).getMonth();
    let currentMonthText = months[currentMonth];
    this.studentInfoByClass.forEach((row: any) => {
      this.dataForExcel.push(row);
    });
    let reportData = {
      title: `${this.schoolInfo?.schoolName} Student Record - ${currentMonthText} ${currentYear}`,
      data: this.dataForExcel,
      headers: Object.keys(this.studentInfoByClass[0]),
    };

    this.ete.exportExcel(reportData);
  }

  allOptions() {
    this.sessions = [{ year: '2023-24' }, { year: '2024-25' }, { year: '2025-26' }, { year: '2026-27' }, { year: '2027-28' }, { year: '2028-29' }, { year: '2029-30' }]
    this.categorys = [{ category: 'General' }, { category: 'OBC' }, { category: 'SC' }, { category: 'ST' }, { category: 'Other' }]
    this.religions = [{ religion: 'Hinduism' }, { religion: 'Buddhism' }, { religion: 'Christanity' }, { religion: 'Jainism' }, { religion: 'Sikhism' }, { religion: 'Other' }]
    this.qualifications = [{ qualification: 'Doctoral Degree' }, { qualification: 'Masters Degree' }, { qualification: 'Graduate Diploma' }, { qualification: 'Graduate Certificate' }, { qualification: 'Graduate Certificate' }, { qualification: 'Bachelor Degree' }, { qualification: 'Advanced Diploma' }, { qualification: 'Primary School' }, { qualification: 'High School' }, { qualification: 'Higher Secondary School' }, { qualification: 'Illiterate' }, { qualification: 'Other' }]
    this.occupations = [{ occupation: 'Agriculture(Farmer)' }, { occupation: 'Laborer' }, { occupation: 'Self Employed' }, { occupation: 'Private Job' }, { occupation: 'State Govt. Employee' }, { occupation: 'Central Govt. Employee' }, { occupation: 'Military Job' }, { occupation: 'Para-Military Job' }, { occupation: 'PSU Employee' }, { occupation: 'Other' }]
  }
}
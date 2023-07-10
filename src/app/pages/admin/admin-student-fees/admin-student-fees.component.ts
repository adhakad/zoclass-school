import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { read, utils, writeFile } from 'xlsx';
import { ClassService } from 'src/app/services/class.service';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { FeesService } from 'src/app/services/fees.service';
import { MatRadioChange } from '@angular/material/radio';
import { FeesStructureService } from 'src/app/services/fees-structure.service';
import { StudentService } from 'src/app/services/student.service';


@Component({
  selector: 'app-admin-student-fees',
  templateUrl: './admin-student-fees.component.html',
  styleUrls: ['./admin-student-fees.component.css']
})
export class AdminStudentFeesComponent implements OnInit {
  feesForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  feesInfo: any[] = [1, 2, 3, 4, 5];
  recordLimit: number = 10;
  filters: any = {};
  number: number = 0;
  paginationValues: Subject<any> = new Subject();
  page: Number = 0;
  cls: any;
  classSubject: any;
  fields: any;
  abc: any;
  subjectName: any[] = [];
  showBulkFeesModal: boolean = false;
  movies: any[] = [];
  selectedValue: number = 0;
  fileChoose: boolean = false;
  existRollnumber: number[] = [];
  clsFeesStructure: any;

  studentList:any[]=[];
  singleStudent:any;
  paybleStallment:any;
  obj:any[]=[];


  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private classSubjectService: ClassSubjectService, private feesService: FeesService, private feesStructureService: FeesStructureService,private studentService:StudentService) {
    this.feesForm = this.fb.group({
      class:[''],
      rollNumber:[''],
      feesAmount: [''],
      feesStallment:['']
    });
  }



  ngOnInit(): void {
    this.getFees({ page: 1 });

    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
    this.getClassSubject(this.cls);
    this.feesStructureByClass(this.cls);
    // this.singleStudentFeesCollection(this.cls,12345);
    // this.getStudentByClass(this.cls);
    this.getAllStudentFeesCollectionByClass(this.cls);
  }

  

  getClassSubject(cls: any) {
    this.classSubjectService.getSubjectByClass(cls).subscribe(res => {
      if (res) {
        // this.showModal=true;
        this.classSubject = res;
      }
    })
  }

  // getStudentByClass(cls:any){
  //   this.studentService.getStudentByClass(cls).subscribe((res:any) => {
  //     if(res){
  //       this.studentList = res;
  //     }
  //   })
  // }

  getAllStudentFeesCollectionByClass(cls:any){
    this.feesService.getAllStudentFeesCollectionByClass(cls).subscribe((res:any) => {
      if(res){
        this.studentList = res;
      }
    })
  }

  // singleStudentFeesCollection(cls:any,rollNumber:any){
  //   this.feesService.singleStudentFeesCollection(cls,rollNumber).subscribe((res:any) => {
  //     if(res){
  //       console.log(res)
  //     }
  //   })
  // }

  feesStructureByClass(cls:any) {
    this.feesStructureService.feesStructureByClass(cls).subscribe((res: any) => {
      this.clsFeesStructure = res;
    })
  }


  closeModal() {
    this.showModal = false;
    this.showBulkFeesModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
    this.paybleStallment = [];
    this.paybleStallment = [0,0];
  }
  studentFeesPay(student:any) {
    this.singleStudent = student;
    const stallment = this.singleStudent.stallment;

    const result = stallment.find((stallment:any) => {
      const [key, value] = Object.entries(stallment)[0];
      return value === 0;
    });
    
    if (result) {
      const [key, value] = Object.entries(result)[0];
      this.paybleStallment = this.clsFeesStructure.stallment.flatMap((item:any) => Object.entries(item).filter(([keys, values]) => keys === key));
    } else {
      this.paybleStallment = [0,0];
      console.log(this.paybleStallment)
    }

    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = false;
    this.feesForm.reset();

  }
  updateFeesModel(fees: any) {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = true;
  }
  deleteFeesModel(id: String) {
    this.showModal = true;
    this.updateMode = false;
    this.deleteMode = true;
    this.deleteById = id;
  }


  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      // this.getFees({ page: this.page });
      this.getAllStudentFeesCollectionByClass(this.cls)
    }, 1000)
  }

  getFees($event: any) {
    this.page = $event.page
    return new Promise((resolve, reject) => {
      let params: any = {
        filters: {},
        page: $event.page,
        limit: $event.limit ? $event.limit : this.recordLimit,
        class: this.cls
      };
      this.recordLimit = params.limit;
      if (this.filters.searchText) {
        params["filters"]["searchText"] = this.filters.searchText.trim();
      }

      this.feesService.feesPaginationList(params).subscribe((res: any) => {
        if (res) {
          this.feesInfo = res.feesList;
          this.number = params.page;
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.countFees });
          return resolve(true);
        }
      });
    });
  }

  feesAddUpdate() {
    if (this.feesForm.valid) {
      if (this.updateMode) {
        this.feesService.updateFees(this.feesForm.value).subscribe((res: any) => {
          if (res) {
            this.successDone();
            this.successMsg = res;
          }
        }, err => {
          this.errorCheck = true;
          this.errorMsg = err.error;
        })
      } else {
        this.feesForm.value.class = this.singleStudent.class;
        this.feesForm.value.rollNumber = this.singleStudent.rollNumber;
        this.feesForm.value.feesStallment = this.paybleStallment[0][0]
        this.feesForm.value.feesAmount = this.paybleStallment[0][1]
        console.log(this.feesForm.value)
        this.feesService.addFees(this.feesForm.value).subscribe((res: any) => {
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



  feesDelete(id: String) {
    this.feesService.deleteFees(id).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
        this.deleteById = '';
      }
    })
  }



  handleImport($event: any) {
    console.log("xlsx file")
    this.fileChoose = true;
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.fees);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.movies = rows;
        }
      }
      reader.readAsArrayBuffer(file);
    }

  }

  onChange(event: MatRadioChange) {
    this.selectedValue = event.value;
  }
  addBulkFeesModel() {
    this.showBulkFeesModal = true;
  }
  addBulkFees() {
    this.feesService.addBulkFees(this.movies).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
      }
    }, err => {
      this.errorCheck = true;
      this.errorMsg = err.error.errMsg;
      this.existRollnumber = err.error.existRollnumber;
    })
  }


}

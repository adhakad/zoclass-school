import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { read, utils,writeFile } from 'xlsx';
import { ClassService } from 'src/app/services/class.service';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { ExamResultService } from 'src/app/services/exam-result.service';
import { MatRadioChange } from '@angular/material/radio';


@Component({
  selector: 'app-admin-student-result',
  templateUrl: './admin-student-result.component.html',
  styleUrls: ['./admin-student-result.component.css']
})
export class AdminStudentResultComponent implements OnInit {
  examResultForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  examResultInfo: any[] = [];
  recordLimit: number = 10;
  filters: any = {};
  number: number = 0;
  paginationValues: Subject<any> = new Subject();
  page: Number = 0;
  cls: any;
  classSubject: any;
  fields: any;
  abc: any;
  subjectName:any[]=[];

  showBulkResultModal:boolean = false;
  bulkResult: any[] = [];
  selectedValue:number=0;
  fileChoose:boolean=false;
  existRollnumber:number[]=[];
  examType: any[] = ["quarterly", "half yearly", "final"];
  selectedExam:any = '';

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private classSubjectService: ClassSubjectService, private examResultService: ExamResultService) {
    this.examResultForm = this.fb.group({
      rollNumber: ['', Validators.required],
      examType: ['', Validators.required],
      type: this.fb.group({
        theoryMarks: this.fb.array([]),
      }),
    });
  }



  ngOnInit(): void {
    this.getExamResults({page : 1});

    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
    this.getClassSubject(this.cls);
  }
  getClassSubject(cls: any) {
    this.classSubjectService.getSubjectByClass(cls).subscribe(res => {
      if (res) {
        if (res) {
          this.classSubject = res.map((item: any) => {
            return item.subject;
          })
          console.log(this.classSubject)
          if (this.classSubject) {
            this.patch();
          }
        }
      }
    })
  }
  closeModal() {
    this.showModal = false;
    this.showBulkResultModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
  }
  addExamResultModel() {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = false;
    this.examResultForm.reset();

  }
  updateExamResultModel(examResult: any) {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = true;
    this.examResultForm.patchValue(examResult);
  }
  deleteExamResultModel(id: String) {
    this.showModal = true;
    this.updateMode = false;
    this.deleteMode = true;
    this.deleteById = id;
  }


  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getExamResults({page : this.page});
    }, 1000)
  }

  getExamResults($event:any) {
    this.page = $event.page
    return new Promise((resolve, reject) => {
      let params:any = {
        filters: {},
        page: $event.page,
        limit: $event.limit ? $event.limit : this.recordLimit,
        class:this.cls
      };
      this.recordLimit = params.limit;
      if(this.filters.searchText) {
        params["filters"]["searchText"] = this.filters.searchText.trim();
      }

      this.examResultService.examResultPaginationList(params).subscribe((res: any) => {
        if (res) {
          this.examResultInfo = res.examResultList;
          this.number = params.page;
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.countExamResult });
          return resolve(true);
        }
      });
    });
  }

  examResultAddUpdate() {
    if (this.examResultForm.valid) {
      if (this.updateMode) {
        this.examResultService.updateExamResult(this.examResultForm.value).subscribe((res: any) => {
          if (res) {
            this.successDone();
            this.successMsg = res;
          }
        }, err => {
          this.errorCheck = true;
          this.errorMsg = err.error;
        })
      } else {
        this.examResultForm.value.class = this.cls;
        this.examResultService.addExamResult(this.examResultForm.value).subscribe((res: any) => {
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


  patch() {
    const controlOne = <FormArray>this.examResultForm.get('type.theoryMarks');
    this.classSubject.forEach((x: any) => {
      controlOne.push(this.patchValues(x))
      this.examResultForm.reset();
    })
  }

  patchValues(theoryMarks: any) {
    return this.fb.group({
      [theoryMarks]: [theoryMarks],
    })
  }

  examResultDelete(id: String) {
    this.examResultService.deleteExamResult(id).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
        this.deleteById = '';
      }
    })
  }


  selectExam(selectedExam: string) {
    if(selectedExam){
      this.selectedExam = selectedExam;
    }
  }

  handleImport($event: any) {
    console.log("xlsx file")
    this.fileChoose=true;
    const files = $event.target.files;
    if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;

            if (sheets.length) {
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                this.bulkResult = rows;
            }
        }
        reader.readAsArrayBuffer(file);
    }
    
}

onChange(event:MatRadioChange){
  this.selectedValue = event.value;
}
addBulkExamResultModel(){
  this.showBulkResultModal = true;
}
addBulkExamResult(){
  let resultData = {
    examType:this.selectedExam,
    bulkResult:this.bulkResult
  }

  this.examResultService.addBulkExamResult(resultData).subscribe((res:any)=> {
    if(res){
      this.successDone();
      this.successMsg = res;
    }
  },err => {
    this.errorCheck = true;
    this.errorMsg = err.error.errMsg;
    this.existRollnumber = err.error.existRollnumber;
  })
}

handleExport() {
    const headings = [[
        'rollNumber',
        'Class',
        'Hindi',
        'English',
        'Sanskrit',
        'Maths',
        'Science'
    ]];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.bulkResult, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Report');
    writeFile(wb, 'Result.xlsx');
}
}

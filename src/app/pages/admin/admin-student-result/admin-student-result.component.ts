import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { read, utils, writeFile } from 'xlsx';
import { ExamResultService } from 'src/app/services/exam-result.service';
import { MatRadioChange } from '@angular/material/radio';
import { ExamResultStructureService } from 'src/app/services/exam-result-structure.service';

@Component({
  selector: 'app-admin-student-result',
  templateUrl: './admin-student-result.component.html',
  styleUrls: ['./admin-student-result.component.css']
})
export class AdminStudentResultComponent implements OnInit {
  examResultForm: FormGroup;
  showModal: boolean = false;
  showBulkResultModal: boolean = false;
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
  selectedValue: number = 0;
  examResultStr: any;
  classSubject: any[] = [];
  practicalSubjects: any[] = [];
  fileChoose: boolean = false;
  existRollnumber: number[] = [];
  bulkResult: any[] = [];
  selectedExam: any = '';
  stream: string = '';
  notApplicable: String = "stream";
  examType: any[] = ["quarterly", "half yearly", "final"];
  streamMainSubject: any[] = ['Mathematics(Science)', 'Biology(Science)', 'History(Arts)', 'Sociology(Arts)', 'Political Science(Arts)', 'Accountancy(Commerce)', 'Economics(Commerce)'];


  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private examResultService: ExamResultService, private examResultStructureService: ExamResultStructureService) {
    this.examResultForm = this.fb.group({
      rollNumber: ['', Validators.required],
      examType: [''],
      stream: [''],
      type: this.fb.group({
        theoryMarks: this.fb.array([]),
        practicalMarks: this.fb.array([]),
      }),
    });
  }


  ngOnInit(): void {
    this.getExamResults({ page: 1 });
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
  }

  addExamResultModel() {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = false;
    this.examResultForm.reset();

  }
  addBulkExamResultModel() {
    this.showBulkResultModal = true;
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
  closeModal() {
    this.examResultStr = '';
    this.practicalSubjects = [];
    this.selectedExam = '';
    this.stream = '';
    this.showModal = false;
    this.showBulkResultModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
    this.examResultForm.reset();
  }
  onChange(event: MatRadioChange) {
    this.selectedValue = event.value;
  }

  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getExamResults({ page: this.page });
    }, 1000)
  }

  getExamResults($event: any) {
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

  
  selectExam(selectedExam: string) {
    this.selectedExam = selectedExam;
    if (this.stream && selectedExam && this.cls) {
      let params = {
        cls: this.cls,
        stream: this.stream,
        examType: selectedExam,
      }
      this.getSingleClassResultStrucByStream(params);
    }
  }

  chooseStream(stream: any) {
    this.stream = stream;
    if (stream && this.selectedExam && this.cls) {
      let params = {
        cls: this.cls,
        stream: stream,
        examType: this.selectedExam,
      }
      this.getSingleClassResultStrucByStream(params);
    }
  }

  getSingleClassResultStrucByStream(params: any) {
    this.examResultStructureService.getSingleClassResultStrucByStream(params).subscribe((res: any) => {
      if (res) {
        if (res.theoryMaxMarks) {
          this.classSubject = res.theoryMaxMarks.map((item: any) => {
            const theorySubject = Object.keys(item)[0];
            return theorySubject;
          })
          if (this.classSubject) {
            this.patchTheory();
          }
        }

        if (res.practicalMaxMarks) {
          this.practicalSubjects = res.practicalMaxMarks.map((item: any) => {
            const practicalSubject = Object.keys(item)[0];
            return practicalSubject;
          })
          if (this.practicalSubjects) {
            this.patchPractical();
          }
        }
      }
    })
  }

  patchTheory() {
    const controlOne = <FormArray>this.examResultForm.get('type.theoryMarks');
    this.classSubject.forEach((x: any) => {
      controlOne.push(this.patchTheoryValues(x))
      this.examResultForm.reset();
    })
  }
  patchPractical() {
    const controlOne = <FormArray>this.examResultForm.get('type.practicalMarks');
    this.practicalSubjects.forEach((x: any) => {
      controlOne.push(this.patchPracticalValues(x))
      this.examResultForm.reset();
    })
  }
  patchTheoryValues(theoryMarks: any) {
    return this.fb.group({
      [theoryMarks]: [theoryMarks],
    })
  }

  patchPracticalValues(practicalMarks: any) {
    return this.fb.group({
      [practicalMarks]: [practicalMarks],
    })
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
        if (this.practicalSubjects.length === 0) {
          delete this.examResultForm.value.type.practicalMarks;
        }
        this.examResultForm.value.examType = this.selectedExam;
        this.examResultForm.value.stream = this.stream;
        this.examResultForm.value.class = this.cls;
        console.log(this.examResultForm.value)
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

  examResultDelete(id: String) {
    this.examResultService.deleteExamResult(id).subscribe((res: any) => {
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

  addBulkExamResult() {
    let resultData = {
      examType: this.selectedExam,
      stream: this.stream,
      bulkResult: this.bulkResult
    }

    this.examResultService.addBulkExamResult(resultData).subscribe((res: any) => {
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

  handleExport() {
    let rollNumber="rollNumber";
    const headings = [[
      rollNumber,
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

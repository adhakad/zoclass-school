import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { TestService } from 'src/app/services/test.service';
import { QuestionService } from 'src/app/services/question.service';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
@Component({
  selector: 'app-teacher-test',
  templateUrl: './teacher-test.component.html',
  styleUrls: ['./teacher-test.component.css']
})
export class TeacherTestComponent implements OnInit {
  testForm: FormGroup;
  questionForm: FormGroup;
  showModal: boolean = false;
  showAddTestModal: boolean = false;
  showAddQuestionModal: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  testId: any;
  totalQuestion: number = 0;
  fields: any;
  arr: any[] = [];
  addTestQuestions: number[] = [];
  testInfo: any[] = [];
  allClass: any[] = [];
  allSubject: any[] = [];
  totalQuestions: any[] = [];
  durations: any[] = [];

  recordLimit: number = 5;
  filters: any = {};
  number: number = 0;
  scheduleDate: any;
  startTiming: any;
  completeTiming: any;
  timeNow: any;

  paginationValues: Subject<any> = new Subject();
  constructor(private fb: FormBuilder, private testService: TestService, private questionService: QuestionService, private classService: ClassService, private subjectService: SubjectService) {

    this.testForm = this.fb.group({
      _id: [''],
      class: ['', Validators.required],
      subject: ['', Validators.required],
      title: ['', Validators.required],
      totalQuestion: ['', Validators.required],
      duration: ['', Validators.required],
      startTime: ['', Validators.required],
    })

    this.questionForm = this.fb.group({
      type: this.fb.group({
        option: this.fb.array([])
      }),
    })
  }

  ngOnInit(): void {
    this.getTest({ page: 1 });
    this.getAllClasses();
    this.getAllSubjects();
    this.getTotalQuestions();
    this.getTimeDurations();

  }
  addTestModal() {
    this.showModal = true;
    this.showAddTestModal = true;
  }
  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getTest({ page: 1 });
    }, 1000)
  }

  closeModal() {
    this.showModal = false;
    this.showAddTestModal = false;
    this.showAddQuestionModal = false;
    this.deleteMode = false;
    this.errorMsg = '';
  }

  deleteTestModel(id: String) {
    this.showModal = true;
    this.deleteMode = true;
    this.deleteById = id;
  }

  testSubmit() {
    if (this.testForm.valid) {
      this.testService.addQuizDetail(this.testForm.value).subscribe((res: any) => {
        if (res) {
          this.showAddTestModal = false;
          this.showAddQuestionModal = true;
          this.testId = res.testDetail._id;
          this.totalQuestion = this.testForm.value.totalQuestion;
          for (var i = 0; i < this.totalQuestion; i++) {
            this.addTestQuestions.push(i + 1);
          }
          for (var i = 0; i < this.addTestQuestions.length; i++) {
            this.fields = { questionText: "questionText", option1: "option1", option2: "option2", option3: "option3", option4: "option4", ansId: "ansId" };
            this.arr.push(this.fields);
          }
          this.testForm.reset();
          this.patch();
        }
      });
    }
  }
  questionSubmit() {
    console.log(this.testId)
    this.questionService.createQuetions(this.questionForm.value, this.testId).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
      }
    }, err => {
      this.errorCheck = true;
      this.errorMsg = err.error;
    })
  }

  patch() {
    const control = <FormArray>this.questionForm.get('type.option');
    this.arr.forEach(x => {
      control.push(this.patchValues(x.questionText, x.option1, x.option2, x.option2, x.option4, x.ansId))
      this.questionForm.reset();
    })
  }

  patchValues(questionText: any, option1: any, option2: any, option3: any, option4: any, ansId: any) {
    return this.fb.group({
      questionText: [questionText],
      option1: [option1],
      option2: [option2],
      option3: [option3],
      option4: [option4],
      ansId: [ansId],
    })
  }

  getTest($event: any) {
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

      this.testService.testPaginationList(params).subscribe((res: any) => {
        if (res) {
          this.showAddQuestionModal = false;
          this.questionForm.reset();
          this.addTestQuestions.length = 0;
          this.testInfo = res.testData.testList;
          this.timeNow = res?.timeNow;
          let newArray = this.testInfo.map((item) => { return { startTime: item.startTime, endTime: item.endTime } });
          for (let i = 0; i < newArray.length; i++) {
            let startTime = this.testInfo[i].startTime * 1000;
            let endTime = this.testInfo[i].endTime * 1000;
            this.scheduleDate = new Date(startTime).toLocaleString("en-US", {
              timeZone: 'Asia/Kolkata',
              year: 'numeric',
              day: 'numeric',
              month: 'long',
            })
            this.startTiming = new Date(startTime).toLocaleString("en-US", {
              timeZone: 'Asia/Kolkata',
              hour: '2-digit',
              minute: '2-digit',
            })
            this.completeTiming = new Date(endTime).toLocaleString("en-US", {
              timeZone: 'Asia/Kolkata',
              hour: '2-digit',
              minute: '2-digit',
            })
            this.testInfo[i].scheduleDate = this.scheduleDate;
            this.testInfo[i].startTiming = this.startTiming;
            this.testInfo[i].completeTiming = this.completeTiming;
          }
          this.number = params.page;
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.testData.countTest });
          return resolve(true);
        }
      }, error => {
        console.log(error.error)
      });
    });
  }

  getAllClasses() {
    this.classService.getClassList().subscribe((res) => {
      if (res) {
        this.allClass = res;
      }
    })
  }

  getAllSubjects() {
    this.subjectService.getSubjectList().subscribe((res) => {
      if (res) {
        this.allSubject = res
      }
    })

  }

  testDelete(id: String) {
    this.testService.testDelete(id).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
        this.deleteById = '';
      }
    })
  }


  getTotalQuestions() {
    this.totalQuestions =
      [
        { questions: 1 }, { questions: 2 }, { questions: 5 }, { questions: 10 }, { questions: 25 }, { questions: 50 },
      ]
  }

  getTimeDurations() {
    this.durations =
      [
        { duration: 1 }, { duration: 2 }, { duration: 5 }, { duration: 10 }, { duration: 15 }, { duration: 30 }, { duration: 60 }, { duration: 120 }, { duration: 180 }
      ]
  }
}
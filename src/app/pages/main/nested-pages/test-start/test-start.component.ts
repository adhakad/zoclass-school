import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute } from '@angular/router';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { TestResultService } from 'src/app/services/test-result.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-test-start',
  templateUrl: './test-start.component.html',
  styleUrls: ['./test-start.component.css']
})
export class TestStartComponent implements OnInit {
  timer = 0;
  nextDisabled: any;
  btnEnabled: boolean = false;
  isTestCompleted: boolean = false;
  public testList: any = [];
  public questionList: any = [];
  public currentQuestion: number = 0;
  public saveAnswerList: any = [];
  selectOption: any;
  queAnsSelect: any[] = [];
  isAttempted: number = 0;
  unAttempted: number = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  percentile: any;
  studentUserInfo: any;
  subjectInfo: any;

  id: any;
  cls: any;
  studentTestCompleted: Boolean = false;

  constructor(private testService: TestService, private questionService: QuestionService, private activatedRoute: ActivatedRoute, private studentAuthService: StudentAuthService, private testResultService: TestResultService, private subjectService: SubjectService) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cls = this.studentAuthService.getLoggedInStudentInfo()?.class
    this.studentUserInfo = this.studentAuthService.getLoggedInStudentInfo();
    let studentId = this.studentUserInfo?.id;
    if (this.cls) {
      this.studentTestAlreadyCompleted(studentId);
    }


  }

  studentTestAlreadyCompleted(studentId: any) {
    let params = {
      testId: this.id,
      studentId: studentId
    }
    this.testResultService.studentSingleTestResult(params).subscribe((res: any) => {
      if(res){
        let testId = res.testId;
        if(testId === this.id){
          this.studentTestCompleted = true;
        }
      }
    },error => {
      if(error.error=="Test results not found"){
        this.studentTestCompleted = false;
        this.getSingleTest(this.cls);
      }
    })
  }

  getSingleTest(cls: any) {
    this.testService.getSingleTest(cls).subscribe(res => {
      if (res) {
        this.testList = res.testDetail;
        let subject = this.testList.subject;
        const startTime = this.testList.startTime;
        const endTime = this.testList.endTime;
        const timesTamp = res.timesTamp;
        const tt = res.tt;
        const t = res.t;
        this.timer = tt - t;
        if (startTime > timesTamp) {
          this.timer = 0;
          alert('test start coming soon')
        } else if (startTime == timesTamp) {
          console.log('a')
          this.timer = tt - t;
          this.getSingleTestQuestions(this.id);
          this.startTimer();
        } else if (endTime > timesTamp) {
          console.log('b')
          this.timer = tt - t;
          this.getSingleTestQuestions(this.id);
          this.startTimer();
        } else if (endTime == timesTamp) {
          this.timer = 0;
          console.log('c')
          alert('test already completed')
        } else if (endTime < timesTamp) {
          this.timer = 0;
          console.log('d')
          alert('test already completed')
        }
        this.getSingleSubject(subject);
      }
    }, (err) => {
      console.log(err.error);
    })
  }

  getSingleSubject(subject: any) {
    this.subjectService.getSingleSubjectBySubject(subject).subscribe((res: any) => {
      if (res) {
        this.subjectInfo = res;
      }
    })
  }


  getSingleTestQuestions(id: any) {
    this.questionService.getSingleTestQuestions(id).subscribe(res => {
      if (res) {
        this.questionList = res.question;
        this.nextDisabled = this.questionList.length - 1;
        if (!localStorage.getItem('queAnsSelect')) {
          for (var i = 0; i < this.questionList.length; i++) {
            let queNo = i + 1;
            this.queAnsSelect.push({ queNo: queNo, selectAnswer: 12345 });
          }
          localStorage.setItem('queAnsSelect', JSON.stringify(this.queAnsSelect));
          let saveQueAnswerList = JSON.parse(localStorage.getItem('queAnsSelect') as any);
          this.saveAnswerList = saveQueAnswerList;
        } else {
          let saveQueAnswerList = JSON.parse(localStorage.getItem('queAnsSelect') as any);
          this.saveAnswerList = saveQueAnswerList;
          for (var i = 0; i < this.saveAnswerList.length; i++) {
            let a = this.saveAnswerList[i].selectAnswer;
            if (a !== 12345) {
              this.btnEnabled = true;
            }
          }
        }
      }
    }, (err) => {
      console.log(err.error);
    })
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitTest();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    var hours: any = Math.floor(this.timer / 3600);
    var minutes: any = Math.floor((this.timer - (hours * 3600)) / 60);
    var seconds: any = this.timer - (hours * 3600) - (minutes * 60);
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (hours < 10) {
      hours = `0${hours}`
    }
    return `${hours}:${minutes}:${seconds}`;
  }

  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }

  answer(questionNo: any, option: any) {
    this.selectOption = option
    let index = questionNo - 1;
    let saveQueAnswerList = JSON.parse(localStorage.getItem('queAnsSelect') as any);
    saveQueAnswerList.splice(index, 1, { queNo: questionNo, selectAnswer: this.selectOption })
    localStorage.setItem('queAnsSelect', JSON.stringify(saveQueAnswerList));
    this.getSingleTestQuestions(this.id);
  }

  submitTest() {
    let saveQueAnswerList = JSON.parse(localStorage.getItem('queAnsSelect') as any);
    for (var i = 0; i < saveQueAnswerList?.length; i++) {
      let ansId = this.questionList[i].ansId;
      let selectAnswer = saveQueAnswerList[i].selectAnswer;
      if (ansId == selectAnswer) {
        this.correctAnswer++;
      } else if (selectAnswer == 12345) {
        this.unAttempted++;
      } else {
        this.inCorrectAnswer++;
      }
      this.isAttempted = this.correctAnswer + this.inCorrectAnswer;
      saveQueAnswerList.splice(i, 1, { queNo: i + 1, selectAnswer: selectAnswer, ansId: ansId })
      localStorage.setItem('queAnsSelect', JSON.stringify(saveQueAnswerList));

      let percentiles = (this.correctAnswer * 100) / this.questionList.length;
      this.percentile = percentiles.toFixed(2);
    }
    let studentResult = {
      studentId: this.studentUserInfo.id,
      testId: this.testList._id,
      correctAnswer: this.correctAnswer,
      inCorrectAnswer: this.inCorrectAnswer,
      unAttempted: this.unAttempted,
      subjectId: this.subjectInfo._id
    }
    this.testResultService.addTestResult(studentResult).subscribe(res => {
      if (res) {
        this.isTestCompleted = true;
        localStorage.removeItem('queAnsSelect');
      }
    }, error => {
      if (error.error) {
        localStorage.removeItem('queAnsSelect');
      }
    })
  }
}
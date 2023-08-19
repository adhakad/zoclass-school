import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { ExamResultStructureService } from 'src/app/services/exam-result-structure.service';


@Component({
  selector: 'app-admin-student-result-structure',
  templateUrl: './admin-student-result-structure.component.html',
  styleUrls: ['./admin-student-result-structure.component.css']
})
export class AdminStudentResultStructureComponent implements OnInit {
  cls: any;
  examResultForm: FormGroup;
  disabled = true;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  examType: any[] = ["quarterly", "half yearly", "final"];
  theoryMaxMarks: any[] = [100, 80, 75, 70];
  theoryPassMarks: any[] = [33, 26, 25, 23];
  practicalMaxMarks: any[] = [20, 25, 30];
  practicalPassMarks: any[] = [6, 8, 10];
  classSubject: any[] = [];
  examResultStr: any;
  marksTypeMode: boolean = false;
  marksMode: boolean = false;
  theoryMarks: boolean = true;
  practicalMarks: boolean = false;
  gradeRange: boolean = true;
  gradeMinMarks: any = [{ "A+": 91 }, { "A": 81 }, { "B+": 71 }, { "B": 61 }, { "C+": 51 }, { "C": 41 }, { "D": 33 }, { "E": 0 }];
  gradeMaxMarks: any = [{ "A+": 100 }, { "A": 90 }, { "B+": 80 }, { "B": 70 }, { "C+": 60 }, { "C": 50 }, { "D": 40 }, { "E": 32 }];

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private classSubjectService: ClassSubjectService, private examResultStructureService: ExamResultStructureService) {
    this.examResultForm = this.fb.group({
      class: [''],
      examType: ['', Validators.required],
      type: this.fb.group({
        theoryMaxMarks: this.fb.array([], [Validators.required]),
        theoryPassMarks: this.fb.array([], [Validators.required]),
        practicalMaxMarks: this.fb.array([]),
        practicalPassMarks: this.fb.array([]),
        gradeMinMarks: [''],
        gradeMaxMarks: ['']
      }),
    });
  }

  ngOnInit(): void {
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
    this.getClassSubject(this.cls);
    this.getExamResultStructureByClass(this.cls);
  }


  getClassSubject(cls: any) {
    this.classSubjectService.getSubjectByClass(cls).subscribe((res: any) => {
      if (res) {
        this.classSubject = res.map((item: any) => {
          return item.subject;
        })
        if (this.classSubject) {
          this.patch();
        }
      }
    })
  }

  getExamResultStructureByClass(cls: any) {
    this.examResultStructureService.examResultStructureByClass(cls).subscribe((res: any) => {
      if (res) {
        this.examResultStr = res;
        console.log(res)
      }
    })
  }

  practical(practicalMarks: boolean) {
    if (practicalMarks === false) {
      this.practicalMarks = true;
    }
    if (practicalMarks === true) {
      this.practicalMarks = false;
    }
  }
  // grade(gradeRange: boolean) {
  //   if (gradeRange === false) {
  //     this.gradeRange = true;
  //   }
  //   if (gradeRange === true) {
  //     this.gradeRange = false;
  //   }
  // }
  selectExamResultStructure() {
    this.marksTypeMode = false;
    this.marksMode = true;
  }

  addExamResultModel() {
    this.showModal = true;
    this.marksTypeMode = true;
    this.examResultForm.reset();
  }
  falseAllValue() {
    const controlOne = <FormArray>this.examResultForm.get('type.theoryMaxMarks');
    const controlTwo = <FormArray>this.examResultForm.get('type.theoryPassMarks');
    const controlThree = <FormArray>this.examResultForm.get('type.practicalMaxMarks');
    const controlFour = <FormArray>this.examResultForm.get('type.practicalPassMarks');
    controlOne.clear();
    controlTwo.clear();
    controlThree.clear();
    controlFour.clear();
    this.marksTypeMode = false;
    this.marksMode = false;
    this.practicalMarks = false;
    // this.gradeRange = false;
  }
  closeModal() {
    this.falseAllValue();
    this.showModal = false;
    this.errorMsg = '';
    this.examResultForm.reset();
  }


  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getExamResultStructureByClass(this.cls)
    }, 1000)
  }

  patch() {
    const controlOne = <FormArray>this.examResultForm.get('type.theoryMaxMarks');
    this.classSubject.forEach((x: any) => {
      controlOne.push(this.patchTheoryMaxMarks(x))
      this.examResultForm.reset();
    })

    const controlTwo = <FormArray>this.examResultForm.get('type.theoryPassMarks');
    this.classSubject.forEach((x: any) => {
      controlTwo.push(this.patchTheoryPassMarks(x))
      this.examResultForm.reset();
    })
    const controlThree = <FormArray>this.examResultForm.get('type.practicalMaxMarks');
    this.classSubject.forEach((x: any) => {
      controlThree.push(this.patchPracticalMaxMarks(x))
      this.examResultForm.reset();
    })
    const controlFour = <FormArray>this.examResultForm.get('type.practicalPassMarks');
    this.classSubject.forEach((x: any) => {
      controlFour.push(this.patchPracticalPassMarks(x))
      this.examResultForm.reset();
    })
  }
  patchTheoryMaxMarks(theoryMaxMarks: any) {
    return this.fb.group({
      [theoryMaxMarks]: [theoryMaxMarks],
    })
  }
  patchTheoryPassMarks(theoryPassMarks: any) {
    return this.fb.group({
      [theoryPassMarks]: [theoryPassMarks],
    })
  }

  patchPracticalMaxMarks(practicalMaxMarks: any) {
    return this.fb.group({
      [practicalMaxMarks]: [practicalMaxMarks],
    })
  }
  patchPracticalPassMarks(practicalPassMarks: any) {
    return this.fb.group({
      [practicalPassMarks]: [practicalPassMarks],
    })
  }

  examResultAddUpdate() {

    this.examResultForm.value.class = this.cls;
    if (this.gradeRange) {
      this.examResultForm.value.type.gradeMinMarks = this.gradeMinMarks;
      this.examResultForm.value.type.gradeMaxMarks = this.gradeMaxMarks;
    }
    if (this.practicalMarks) {
      let practicalMaxMarksObj = this.examResultForm.value.type.practicalMaxMarks;
      let practicalPassMarksObj = this.examResultForm.value.type.practicalPassMarks;
      let containsPracticalMaxMarksNull = practicalMaxMarksObj.some((item: any) => Object.values(item).includes(null));
      let containsPracticalPassMarksNull = practicalPassMarksObj.some((item: any) => Object.values(item).includes(null));
    }
    if (!this.practicalMarks) {
      delete this.examResultForm.value.type.practicalMaxMarks;
      delete this.examResultForm.value.type.practicalPassMarks;
    }
    // if (!this.gradeRange) {
    //   delete this.examResultForm.value.type.gradeMaxMarks;
    //   delete this.examResultForm.value.type.gradeMinMarks;
    // }
    let theoryMaxMarksObj = this.examResultForm.value.type.theoryMaxMarks;
    let theoryPassMarksObj = this.examResultForm.value.type.theoryPassMarks;
    let containsTheoryMaxMarksNull = theoryMaxMarksObj.some((item: any) => Object.values(item).includes(null));
    let containsTheoryPassMarksNull = theoryPassMarksObj.some((item: any) => Object.values(item).includes(null));
    if (containsTheoryMaxMarksNull || containsTheoryPassMarksNull) {
      this.errorCheck = true;
      this.errorMsg = 'Please fill all fields';
    }
    if (!containsTheoryMaxMarksNull && !containsTheoryPassMarksNull) {

      this.examResultStructureService.addExamResultStructure(this.examResultForm.value).subscribe((res: any) => {
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

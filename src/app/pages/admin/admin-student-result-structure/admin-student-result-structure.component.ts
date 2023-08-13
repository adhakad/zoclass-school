import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { AdmitCardStructureService } from 'src/app/services/admit-card-structure.service';


@Component({
  selector: 'app-admin-student-result-structure',
  templateUrl: './admin-student-result-structure.component.html',
  styleUrls: ['./admin-student-result-structure.component.css']
})
export class AdminStudentResultStructureComponent implements OnInit {
  cls: any;
  admitcardForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  examType: any[] = ["quarterly", "half yearly", "final"];
  theoryMaxMarks: any[] = [100,80,75,70];
  theoryPassMarks: any[] = [33,26,25,23];
  practicalMaxMarks: any[] = [20,25,30];
  practicalPassMarks: any[] = [6,8,10];
  classSubject: any[] = [];
  examAdmitCard: any[] = [];

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private classSubjectService: ClassSubjectService, private admitCardStructureService: AdmitCardStructureService) {
    this.admitcardForm = this.fb.group({
      class: [''],
      examType: ['', Validators.required],
      type: this.fb.group({
        theoryMaxMarks: this.fb.array([], [Validators.required]),
        theoryPassMarks: this.fb.array([], [Validators.required]),
        practicalMaxMarks: this.fb.array([], [Validators.required]),
        practicalPassMarks: this.fb.array([], [Validators.required]),
      }),
    });
  }

  ngOnInit(): void {
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
    this.getClassSubject(this.cls);
    this.getAdmitCardStructureByClass(this.cls);
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

  getAdmitCardStructureByClass(cls: any) {
    this.admitCardStructureService.admitCardStructureByClass(cls).subscribe((res: any) => {
      if (res) {
        this.examAdmitCard = res;
        console.log(this.examAdmitCard)
      }
    })
  }


  addAdmitCardModel() {
    this.showModal = true;
  }


  closeModal() {
    this.showModal = false;
    this.errorMsg = '';
    this.admitcardForm.reset();
  }


  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getAdmitCardStructureByClass(this.cls)
    }, 1000)
  }

  patch() {
    const controlOne = <FormArray>this.admitcardForm.get('type.theoryMaxMarks');
    this.classSubject.forEach((x: any) => {
      controlOne.push(this.patchTheoryMaxMarks(x))
      this.admitcardForm.reset();
    })

    const controlTwo = <FormArray>this.admitcardForm.get('type.theoryPassMarks');
    this.classSubject.forEach((x: any) => {
      controlTwo.push(this.patchTheoryPassMarks(x))
      this.admitcardForm.reset();
    })
    const controlThree = <FormArray>this.admitcardForm.get('type.practicalMaxMarks');
    this.classSubject.forEach((x: any) => {
      controlThree.push(this.patchPracticalMaxMarks(x))
      this.admitcardForm.reset();
    })
    const controlFour = <FormArray>this.admitcardForm.get('type.practicalPassMarks');
    this.classSubject.forEach((x: any) => {
      controlFour.push(this.patchPracticalPassMarks(x))
      this.admitcardForm.reset();
    })
  }
  patchTheoryMaxMarks(theoryMaxMarks: any) {
    console.log(theoryMaxMarks)
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

  admitcardAddUpdate() {
    
    this.admitcardForm.value.class = this.cls;
    let theoryMaxMarksObj = this.admitcardForm.value.type.theoryMaxMarks;
    let theoryPassMarksObj = this.admitcardForm.value.type.theoryPassMarks;
    let practicalMaxMarksObj = this.admitcardForm.value.type.practicalMaxMarks;
    let practicalPassMarksObj = this.admitcardForm.value.type.practicalPassMarks;
    let containsTheoryMaxMarksNull = theoryMaxMarksObj.some((item: any) => Object.values(item).includes(null));
    let containsTheoryPassMarksNull = theoryPassMarksObj.some((item: any) => Object.values(item).includes(null));
    let containsPracticalMaxMarksNull = practicalMaxMarksObj.some((item: any) => Object.values(item).includes(null));
    let containsPracticalPassMarksNull = practicalPassMarksObj.some((item: any) => Object.values(item).includes(null));
    if (containsTheoryMaxMarksNull || containsTheoryPassMarksNull || containsPracticalMaxMarksNull || containsPracticalPassMarksNull) {
      this.errorCheck = true;
      this.errorMsg = 'Please fill all fields';
    }
    if (!containsTheoryMaxMarksNull && !containsTheoryPassMarksNull && !containsPracticalMaxMarksNull && !containsPracticalPassMarksNull) {
      this.admitCardStructureService.addAdmitCardStructure(this.admitcardForm.value).subscribe((res: any) => {
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

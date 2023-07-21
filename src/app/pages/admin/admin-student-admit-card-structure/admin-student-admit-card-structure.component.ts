import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FeesStructureService } from 'src/app/services/fees-structure.service';
import { ClassSubjectService } from 'src/app/services/class-subject.service';


@Component({
  selector: 'app-admin-student-admit-card-structure',
  templateUrl: './admin-student-admit-card-structure.component.html',
  styleUrls: ['./admin-student-admit-card-structure.component.css']
})
export class AdminStudentAdmitCardStructureComponent implements OnInit {
  cls: any;
  admitcardForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;

  totalFees: number = 0;
  admission = false;
  tution = false;
  books = false;
  uniform = false;

  feesTypeMode: boolean = false;
  feesMode: boolean = false;
  examTime: any[] = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"];
  classSubject: any[] = [];


  selectedDate: any;
  selectedTime: any; // We'll store the time as a string in the format 'HH:mm A'





  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private classSubjectService: ClassSubjectService) {
    this.admitcardForm = this.fb.group({
      type: this.fb.group({
        startTime: this.fb.array([], [Validators.required]),
        endTime: this.fb.array([], [Validators.required]),
      }),
    });
  }

  ngOnInit(): void {
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
    this.getClassSubject(this.cls);
  }




  getClassSubject(cls: any) {
    this.classSubjectService.getSubjectByClass(cls).subscribe((res: any) => {
      if (res) {
        this.classSubject = res.map((item: any) => {
          return item.subject;
        })
        if(this.classSubject){
          this.patch();
        }
      }
    })
  }


  addFeesModel() {
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
    }, 1000)
  }




  patch() {
    const controlOne = <FormArray>this.admitcardForm.get('type.startTime');
    this.classSubject.forEach((x: any) => {
      controlOne.push(this.patchStartTime(x))
      this.admitcardForm.reset();
    })
    const controlTwo = <FormArray>this.admitcardForm.get('type.endTime');
    this.classSubject.forEach((x: any) => {
      controlTwo.push(this.patchEndTime(x))
      this.admitcardForm.reset();
    })
  }

  patchStartTime(startTime: any) {
    return this.fb.group({
      [startTime]: [startTime],
    })
  }

  patchEndTime(endTime: any) {
    return this.fb.group({
      [endTime]: [endTime],
    })
  }

  admitcardAddUpdate() {
    console.log(this.admitcardForm.value)
    // this.admitcardForm.value.class = this.cls;
    // this.admitcardForm.value.totalFees = this.totalFees;
    // let feesTypeObj = this.admitcardForm.value.type.feesType;
    // let feesPayTypeObj = this.admitcardForm.value.type.feesPayType;
    // let containsFeesTypeNull = feesTypeObj.some((item: any) => Object.values(item).includes(null));
    // let containsFeesPayTypeNull = feesPayTypeObj.some((item: any) => Object.values(item).includes(null));
    // if (containsFeesTypeNull || containsFeesPayTypeNull) {
    //   this.errorCheck = true;
    //   this.errorMsg = 'Please fill all fields';
    // }
    // if (!containsFeesTypeNull && !containsFeesPayTypeNull) {
    //   console.log(this.admitcardForm.value.type)
    //   this.feesStructureService.addFeesStructure(this.admitcardForm.value).subscribe((res: any) => {
    //     if (res) {
    //       this.successDone();
    //       this.successMsg = res;
    //     }
    //   }, err => {
    //     this.errorCheck = true;
    //     this.errorMsg = err.error;
    //   })
    // }

  }

}
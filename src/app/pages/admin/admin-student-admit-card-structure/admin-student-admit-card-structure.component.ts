import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { AdmitCardStructureService } from 'src/app/services/admit-card-structure.service';

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
  examType: any[] = ["quarterly", "half yearly", "final"];
  examTime: any[] = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"];
  classSubject: any[] = [];
  examAdmitCard: any[] = [];

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, private classSubjectService: ClassSubjectService, private admitCardStructureService: AdmitCardStructureService) {
    this.admitcardForm = this.fb.group({
      class: [''],
      examType: ['', Validators.required],
      type: this.fb.group({
        examDate: this.fb.array([], [Validators.required]),
        startTime: this.fb.array([], [Validators.required]),
        endTime: this.fb.array([], [Validators.required]),
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



        let date = new Date();

        let examDate: any = [
          { 'Environment Science': '26.07.2020' },
          { 'Geography': '23.07.2023' },
          { 'Economics': '01.07.2020' },
          { 'Home Science': '09.07.2020' },
        ];

        // Convert the date strings to Date objects
        const datesAsObjects = examDate.map((entry: any) => {
          const subject = Object.keys(entry)[0];
          const dateParts = entry[subject].split('.');
          const dateObject = new Date(
            parseInt(dateParts[2], 10),
            parseInt(dateParts[1], 10) - 1,
            parseInt(dateParts[0], 10)
          );
          return { subject, date: dateObject };
        });

        // Sort the dates in ascending order
        datesAsObjects.sort((a: any, b: any) => a.date - b.date);

        // Get the last date
        const lastDate = datesAsObjects[datesAsObjects.length - 1];



        console.log(lastDate)
        console.log(date)


        const date1 = lastDate;
        const date2 = date;
        
        // Set the time components of both dates to zero
        const newDate1 = new Date(date1);
        newDate1.setHours(0, 0, 0, 0);
        
        const newDate2 = new Date(date2);
        newDate2.setHours(0, 0, 0, 0);
        
        // Compare the dates
        if (newDate1.getTime() === newDate2.getTime()) {
          console.log('The dates are equal.');
        } else if (newDate1.getTime() < newDate2.getTime()) {
          console.log('date1 is before date2.');
        } else {
          console.log('date1 is after date2.');
        }




        // const dateString: string = "20.07.2023";
        // const [day, month, year]: number[] = dateString.split(".").map(Number);
        // const dateObject: Date = new Date(year, month - 1, day);
        // const timestamp: number = Math.floor(dateObject.getTime() / 1000);

        // console.log(timestamp);

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
    const controlOne = <FormArray>this.admitcardForm.get('type.examDate');
    this.classSubject.forEach((x: any) => {
      controlOne.push(this.patchExamDate(x))
      this.admitcardForm.reset();
    })

    const controlTwo = <FormArray>this.admitcardForm.get('type.startTime');
    this.classSubject.forEach((x: any) => {
      controlTwo.push(this.patchStartTime(x))
      this.admitcardForm.reset();
    })
    const controlThree = <FormArray>this.admitcardForm.get('type.endTime');
    this.classSubject.forEach((x: any) => {
      controlThree.push(this.patchEndTime(x))
      this.admitcardForm.reset();
    })
  }
  patchExamDate(examDate: any) {
    console.log(examDate)
    return this.fb.group({
      [examDate]: [examDate],
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
    // this.admitcardForm.value.class = this.cls;
    this.admitcardForm.value.type.examDate = this.admitcardForm.value.type.examDate.map((exam: any) => {
      const subject = Object.keys(exam)[0];
      const dateStr = exam[subject];
      const dateObj = new Date(dateStr);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;
      return { [subject]: formattedDate };
    });
    console.log(this.admitcardForm.value)
    this.admitcardForm.value.class = this.cls;
    let examDateObj = this.admitcardForm.value.type.examDate;
    let startTimeObj = this.admitcardForm.value.type.startTime;
    let endTimeObj = this.admitcardForm.value.type.endTime;
    let containsExamDateNull = examDateObj.some((item: any) => Object.values(item).includes(null));
    let containsStartTimeNull = startTimeObj.some((item: any) => Object.values(item).includes(null));
    let containsEndTimeNull = endTimeObj.some((item: any) => Object.values(item).includes(null));
    if (containsExamDateNull || containsStartTimeNull || containsEndTimeNull) {
      this.errorCheck = true;
      this.errorMsg = 'Please fill all fields';
    }
    if (!containsExamDateNull && !containsStartTimeNull && !containsEndTimeNull) {
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
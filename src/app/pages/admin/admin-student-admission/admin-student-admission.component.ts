import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AdmissionService } from 'src/app/services/admission.service';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/modal/class.model';


@Component({
  selector: 'app-admin-student-admission',
  templateUrl: './admin-student-admission.component.html',
  styleUrls: ['./admin-student-admission.component.css']
})
export class AdminStudentAdmissionComponent implements OnInit {
  admissionForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  classInfo: Class[] = [];
  admissionInfo: any[] = [];
  recordLimit: number = 10;
  filters:any = {};
  number:number=0;
  paginationValues: Subject<any> = new Subject();
  page:Number=0;
  sessions:any;
  categorys:any;
  religions:any;
  qualifications:any;
  occupations:any;

  constructor(private fb: FormBuilder, private classService: ClassService, private admissionService: AdmissionService) {
    this.admissionForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      class: ['', Validators.required],
      session:['',Validators.required],
      dob:['',Validators.required],
      gender: ['', Validators.required],
      category: ['', Validators.required],
      religion: ['', Validators.required],
      nationality: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      lastSchool:[''],
      fatherName:['',Validators.required],
      fatherQualification:['',Validators.required],
      fatherOccupation:['',Validators.required],
      fatherContact:['',Validators.required],
      fatherAnnualIncome:['',Validators.required],
      motherName:['',Validators.required],
      motherQualification:['',Validators.required],
      motherOccupation:['',Validators.required],
      motherContact:['',Validators.required],
      motherAnnualIncome:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAdmissions({page : 1});
    this.getClass();
    this.allOptions();
  }

  date(e:any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.admissionForm.get('dob')?.setValue(convertDate, {
      onlyself: true,
    });
  }


  closeModal() {
    this.showModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
  }
  addAdmissionModel() {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = false;
    this.admissionForm.reset();
  }
  updateAdmissionModel(admission: any) {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = true;
    this.admissionForm.patchValue(admission);
  }
  deleteAdmissionModel(id: String) {
    this.showModal = true;
    this.updateMode = false;
    this.deleteMode = true;
    this.deleteById = id;
  }

  getClass() {
    this.classService.getClassList().subscribe((res: Class[]) => {
      if (res) {
        this.classInfo = res;
      }
    })
  }
  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getAdmissions({page : this.page});
    }, 1000)
  }

  getAdmissions($event:any) {
    // this.page = $event.page
    // return new Promise((resolve, reject) => {
    //   let params:any = {
    //     filters: {},
    //     page: $event.page,
    //     limit: $event.limit ? $event.limit : this.recordLimit
    //   };
    //   this.recordLimit = params.limit;
    //   if(this.filters.searchText) {
    //     params["filters"]["searchText"] = this.filters.searchText.trim();
    //   }
      
    //   this.admissionService.admissionPaginationList(params).subscribe((res: any) => {
    //     if (res) {
    //       this.admissionInfo = res.admissionList;
    //       this.number = params.page;
    //       this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.countAdmission });
    //       return resolve(true);
    //     }
    //   });
    // });
  }

  admissionAddUpdate() {
    if (this.admissionForm.valid) {
      if (this.updateMode) {
        // this.admissionService.updateAdmission(this.admissionForm.value).subscribe((res: any) => {
        //   if (res) {
        //     this.successDone();
        //     this.successMsg = res;
        //   }
        // }, err => {
        //   this.errorCheck = true;
        //   this.errorMsg = err.error;
        // })
      } else {
        console.log(this.admissionForm.value)
        this.errorCheck = true;
          this.errorMsg = "err.error";
        this.admissionService.addAdmission(this.admissionForm.value).subscribe((res: any) => {
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
  changeStatus(id:any, statusValue:any) {
    if(id) {
      let params = {
        id : id,
        statusValue: statusValue,
      }
      console.log(this.paginationValues)
      // this.admissionService.changeStatus(params).subscribe((res: any) => {
      //   if(res){
      //     this.getAdmissions({page : this.page});
      //   }
      // })
    }
  }
  admissionDelete(id: String) {
    // this.admissionService.deleteAdmission(id).subscribe((res: any) => {
    //   if (res) {
    //     this.successDone();
    //     this.successMsg = res;
    //     this.deleteById = '';
    //   }
    // })
  }

  allOptions(){
  this.sessions = [{year:'2023-24'},{year:'2024-25'},{year:'2025-26'},{year:'2026-27'},{year:'2027-28'},{year:'2028-29'},{year:'2029-30'}]
  this.categorys = [{category:'General'},{category:'OBC'},{category:'SC'},{category:'ST'},{category:'Other'}]
  this.religions = [{religion:'Hinduism'},{religion:'Buddhism'},{religion:'Christanity'},{religion:'Jainism'},{religion:'Sikhism'},{religion:'Other'}]
  this.qualifications = [{qualification:'Doctoral Degree'},{qualification:'Masters Degree'},{qualification:'Graduate Diploma'},{qualification:'Graduate Certificate'},{qualification:'Graduate Certificate'},{qualification:'Bachelor Degree'},{qualification:'Advanced Diploma'},{qualification:'Primary School'},{qualification:'High School'},{qualification:'Higher Secondary School'},{qualification:'Illiterate'},{qualification:'Other'}]
  this.occupations = [{occupation:'Agriculture(Farmer)'},{occupation:'Laborer'},{occupation:'Self Employed'},{occupation:'Private Job'},{occupation:'State Govt. Employee'},{occupation:'Central Govt. Employee'},{occupation:'Military Job'},{occupation:'Para-Military Job'},{occupation:'PSU Employee'},{occupation:'Other'}]
  }

}
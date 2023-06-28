import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { StudyMaterialService } from 'src/app/services/study-material.service';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/modal/class.model';
import { SubjectService } from 'src/app/services/subject.service';


@Component({
  selector: 'app-admin-study-material',
  templateUrl: './admin-study-material.component.html',
  styleUrls: ['./admin-study-material.component.css']
})
export class AdminStudyMaterialComponent implements OnInit {
  studyMaterialForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  classInfo: Class[] = [];
  subjectInfo: any[] = [];
  studyMaterialInfo: any[] = [];
  recordLimit: number = 5;
  filters:any = {};
  number:number=0;
  date:any;
  time:any;
  paginationValues: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, private classService: ClassService,private subjectService:SubjectService, private studyMaterialService: StudyMaterialService) {
    this.studyMaterialForm = this.fb.group({
      _id: [''],
      class: ['', Validators.required],
      subject:['',Validators.required],
      title: ['', Validators.required],
      tags: ['', Validators.required],
      content:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.getStudyMaterials({page : 1});
    this.getClass();
    this.getSubject();
  }
  closeModal() {
    this.showModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
  }
  addStudyMaterialModel() {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = false;
    this.studyMaterialForm.reset();
  }
  updateStudyMaterialModel(studyMaterial: any) {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = true;
    this.studyMaterialForm.patchValue(studyMaterial);
  }
  deleteStudyMaterialModel(id: String) {
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
  getSubject() {
    this.subjectService.getSubjectList().subscribe((res) => {
      if (res) {
        this.subjectInfo = res
      }
    })

  }

  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getStudyMaterials({page : 1});
    }, 1000)
  }

  getStudyMaterials($event:any) {
    return new Promise((resolve, reject) => {
      let params:any = {
        filters: {},
        page: $event.page,
        limit: $event.limit ? $event.limit : this.recordLimit
      };
      this.recordLimit = params.limit;
      if(this.filters.searchText) {
        params["filters"]["searchText"] = this.filters.searchText.trim();
      }
      
      this.studyMaterialService.studyMaterialPaginationList(params).subscribe((res: any) => {
        if (res) {
          this.studyMaterialInfo = res.studyMaterialList;
          this.number = params.page;
          for (let i = 0; i < this.studyMaterialInfo.length; i++) {
            let dateTime = this.studyMaterialInfo[i].date;
            this.date = new Date(dateTime).toLocaleString("en-US", {
              timeZone: 'Asia/Kolkata',
              year: 'numeric',
              day: 'numeric',
              month: 'long',
            })
            this.time = new Date(dateTime).toLocaleString("en-US", {
              timeZone: 'Asia/Kolkata',
              hour: '2-digit',
              minute: '2-digit',
            })
            this.studyMaterialInfo[i].date = this.date;
            this.studyMaterialInfo[i].time = this.time;
          }
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.countStudyMaterial });
          return resolve(true);
        }
      });
    });
  }



  studyMaterialAddUpdate() {
    if (this.studyMaterialForm.valid) {
      if (this.updateMode) {
        this.studyMaterialService.updateStudyMaterial(this.studyMaterialForm.value).subscribe((res: any) => {
          if (res) {
            this.successDone();
            this.successMsg = res;
          }
        }, err => {
          this.errorCheck = true;
          this.errorMsg = err.error;
        })
      } else {
        this.studyMaterialService.addStudyMaterial(this.studyMaterialForm.value).subscribe((res: any) => {
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

  studyMaterialDelete(id: String) {
    this.studyMaterialService.deleteStudyMaterial(id).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
        this.deleteById = '';
      }
    })
  }
}


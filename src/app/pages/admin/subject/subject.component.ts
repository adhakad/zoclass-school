import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
// import { Subject } from 'src/app/modal/subject.model';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjectForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  subjectInfo: any[] = [];

  recordLimit: number = 5;
  filters: any = {};
  number: number = 0;
  paginationValues: Subject<any> = new Subject();
  constructor(private fb: FormBuilder, private subjectService: SubjectService) {
    this.subjectForm = this.fb.group({
      _id: [''],
      subject: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getSubject({page:1});
  }

  getSubject($event:any) {
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
      
      this.subjectService.subjectPaginationList(params).subscribe((res: any) => {
        if (res) {
          this.subjectInfo = res.subjectList;
          this.number = params.page;
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.countSubject });
          return resolve(true);
        }
      });
    });
  }

  closeModal() {
    this.showModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
  }
  addSubjectModel() {
    this.showModal = true;
    this.deleteMode = false;
    this.subjectForm.reset();
  }
  updateSubjectModel(subject: any) {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = true;
    this.subjectForm.patchValue(subject);
  }
  deleteSubjectModel(id: String) {
    this.showModal = true;
    this.updateMode = false;
    this.deleteMode = true;
    this.deleteById = id;
  }

  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getSubject({page:1});
    }, 1000)
  }
  subjectAddUpdate() {
    if (this.subjectForm.valid) {
      if (this.updateMode) {
        this.subjectService.updateSubject(this.subjectForm.value).subscribe((res: any) => {
          if (res) {
            this.successDone();
            this.successMsg = res;
          }
        }, err => {
          this.errorCheck = true;
          this.errorMsg = err.error;
        })
      } else {
        this.subjectService.addSubject(this.subjectForm.value).subscribe((res: any) => {
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

  subjectDelete(id: String) {
    this.subjectService.deleteSubject(id).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
        this.deleteById = '';
      }
    })
  }
}
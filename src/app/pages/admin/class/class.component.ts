import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Class } from '../../../modal/class.model';
import { ClassService } from '../../../services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  classForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  classInfo: Class[] = [];

  recordLimit: number = 5;
  filters: any = {};
  number: number = 0;
  paginationValues: Subject<any> = new Subject();
  constructor(private fb: FormBuilder, private classService: ClassService) {
    this.classForm = this.fb.group({
      _id: [''],
      class: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getClass({ page: 1 });

  }
  closeModal() {
    this.showModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
  }
  addClassModel() {
    this.showModal = true;
    this.deleteMode = false;
    this.classForm.reset();
  }
  updateClassModel(cls: Class) {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = true;
    this.classForm.patchValue(cls);
  }
  deleteClassModel(id: String) {
    this.showModal = true;
    this.updateMode = false;
    this.deleteMode = true;
    this.deleteById = id;
  }

  getClass($event: any) {
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

      this.classService.classPaginationList(params).subscribe((res: any) => {
        if (res) {
          this.classInfo = res.classList;
          this.number = params.page;
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.countClass });
          return resolve(true);
        }
      });
    });
  }


  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getClass({ page: 1 });
    }, 1000)
  }

  classAddUpdate() {
    if (this.classForm.valid) {
      if (this.updateMode) {
        this.classService.updateClass(this.classForm.value).subscribe((res: any) => {
          if (res) {
            this.successDone();
            this.successMsg = res;
          }
        }, err => {
          this.errorCheck = true;
          this.errorMsg = err.error;
        })
      } else {
        this.classService.addClass(this.classForm.value).subscribe((res: any) => {
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
  classDelete(id: String) {
    this.classService.deleteClass(id).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
        this.deleteById = '';
      }
    })
  }

}

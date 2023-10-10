import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {

  schoolForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  schoolInfo: any;
  constructor(private fb: FormBuilder,private schoolService: SchoolService) {
    this.schoolForm = this.fb.group({
      _id: [''],
      schoolName: ['', [Validators.required, Validators.maxLength(50)]],
      affiliationNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      schoolCode: ['', [Validators.required, Validators.maxLength(10)]],
      foundedYear: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
      board: ['', [Validators.required, Validators.maxLength(50)]],
      medium: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.maxLength(50)]],
      pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^\d+$/)]],
      email:['',[Validators.required, Validators.email]],
    })
  }
  ngOnInit(): void {
    this.getSchool();
  }
  closeModal() {
    this.showModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
    this.schoolForm.reset();
  }
  addSchoolModel() {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = false;
    this.schoolForm.reset();
  }
  updateSchoolModel(school: any) {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = true;
    this.schoolForm.patchValue(school);
  }
  deleteSchoolModel(id: String) {
    this.showModal = true;
    this.updateMode = false;
    this.deleteMode = true;
    this.deleteById = id;
  }
  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getSchool();
    }, 1000)
  }

  getSchool() {
      this.schoolService.getSchool().subscribe((res: any) => {
        if (res) {
          this.schoolInfo = res;
        }
      });
  }

  schoolAddUpdate() {
    if (this.schoolForm.valid) {
      if (this.updateMode) {
        this.schoolService.updateSchool(this.schoolForm.value).subscribe((res: any) => {
          if (res) {
            this.successDone();
            this.successMsg = res;
          }
        }, err => {
          this.errorCheck = true;
          this.errorMsg = err.error;
        })
      } else {
        this.schoolService.addSchool(this.schoolForm.value).subscribe((res: any) => {
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
  schoolDelete(id: String) {
    this.schoolService.deleteSchool(id).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
        this.deleteById = '';
      }
    })
  }

}


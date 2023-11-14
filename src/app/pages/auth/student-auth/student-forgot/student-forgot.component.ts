import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/auth/admin-auth.service';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { TeacherAuthService } from 'src/app/services/auth/teacher-auth.service';
import { ClassService } from 'src/app/services/class.service';
@Component({
  selector: 'app-student-forgot',
  templateUrl: './student-forgot.component.html',
  styleUrls: ['./student-forgot.component.css']
})
export class StudentForgotComponent implements OnInit {
  errorMsg: string = '';
  successMsg: String = '';
  varifyForm: FormGroup;
  otpForm: FormGroup;
  resetForm: FormGroup;
  formType: String = 'Varify';
  classInfo: any;
  varifiedStudentInfo:any;
  varifiedOtpInfo:any;
  constructor(private fb: FormBuilder, private router: Router, private classService: ClassService, private studentAuthService: StudentAuthService, private adminAuthService: AdminAuthService, private teacherAuthService: TeacherAuthService) {
    this.varifyForm = this.fb.group({
      rollNumber: ['', Validators.required],
      class: ['', Validators.required],
    })
    this.otpForm = this.fb.group({
      otp: ['', Validators.required],
      rollNumber: [''],
      class: [''],
    })
    this.resetForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      otp: [''],
      rollNumber: [''],
      class: [''],
    })
  }
  ngOnInit(): void {
    this.getClass();
  }

  getClass() {
    this.classService.getClassList().subscribe((res) => {
      this.classInfo = res;
    })
  }


  studentVarify() {
    if (this.varifyForm.valid) {
      this.studentAuthService.studentVarify(this.varifyForm.value).subscribe((res: any) => {
        if (res) {
          this.errorMsg = '';
          this.varifiedStudentInfo = res.varifiedStudentInfo;
          this.formType = 'Otp';
        }
      }, err => {
        this.errorMsg = err.error;
      })
    }
  }
  otpVarify() {
    this.otpForm.value.class = this.varifiedStudentInfo.class;
    this.otpForm.value.rollNumber = this.varifiedStudentInfo.rollNumber;
    this.studentAuthService.otpVarify(this.otpForm.value).subscribe((res: any) => {
      if (res) {
        this.errorMsg = '';
        this.varifiedOtpInfo = res.varifiedOtpInfo;
        this.formType = 'Reset';
      }
    }, err => {
      this.errorMsg = err.error;
    })
  }
  usernamePasswordReset() {
    this.resetForm.value.class = this.varifiedOtpInfo.class;
    this.resetForm.value.rollNumber = this.varifiedOtpInfo.rollNumber;
    this.resetForm.value.otp = this.varifiedOtpInfo.otp;
    this.studentAuthService.usernamePasswordReset(this.resetForm.value).subscribe((res: any) => {
      if (res) {
        this.errorMsg = '';
        this.formType = 'ResetSuccsess';
        if(this.formType=='ResetSuccsess'){
          this.successMsg = res;
        }
      }
    }, err => {
      this.errorMsg = err.error;
    })
  }
}
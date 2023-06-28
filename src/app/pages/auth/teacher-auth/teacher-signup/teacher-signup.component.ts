import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherAuthService } from 'src/app/services/auth/teacher-auth.service';

@Component({
  selector: 'app-teacher-signup',
  templateUrl: './teacher-signup.component.html',
  styleUrls: ['./teacher-signup.component.css']
})
export class TeacherSignupComponent implements OnInit {

  errorMsg: string = '';
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, public teacherAuthService: TeacherAuthService, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      otp: ['', Validators.required],
      teacherUserId: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }


  signup() {
    if (this.signupForm.valid) {
      this.teacherAuthService.signup(this.signupForm.value).subscribe((res: any) => {
        if (res) {
          this.router.navigate(['/teacher/login']);
        }
      }, err => {
        this.errorMsg = err.error;
      })
    }
  }
}

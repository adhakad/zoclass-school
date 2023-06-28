import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/auth/admin-auth.service';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { TeacherAuthService } from 'src/app/services/auth/teacher-auth.service';
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  errorMsg:string ='';
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,private router:Router,private studentAuthService: StudentAuthService,private adminAuthService: AdminAuthService,private teacherAuthService: TeacherAuthService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      if(this.adminAuthService.getAccessToken() || this.teacherAuthService.getAccessToken()){
        this.errorMsg = "Login not valid";
        return
      }
      this.studentAuthService.login(this.loginForm.value).subscribe((res:any) => {
        if(res){
          const accessToken = res.accessToken;
          const refreshToken = res.refreshToken;
          this.studentAuthService.storeAccessToken(accessToken);
          this.studentAuthService.storeRefreshToken(refreshToken);
          this.router.navigate(["/student/dashboard"], { replaceUrl: true });
        }
      },err => {
        this.errorMsg = err.error.errorMsg;
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  errorMsg: string = '';
  resultForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.resultForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }
  result() {
    // if (this.resultForm.valid) {
    //   if(this.adminAuthService.getAccessToken() || this.studentAuthService.getAccessToken()){
    //     this.errorMsg = "Login not valid";
    //     return
    //   }
    //   this.teacherAuthService.result(this.resultForm.value).subscribe((res:any) => {
    //     if(res){
    //       const accessToken = res.accessToken;
    //       const refreshToken = res.refreshToken;
    //       this.teacherAuthService.storeAccessToken(accessToken);
    //       this.teacherAuthService.storeRefreshToken(refreshToken);
    //       this.router.navigate(["/teacher/dashboard"], { replaceUrl: true });
    //     }
    //   },err => {
    //     this.errorMsg = err.error.errorMsg;
    //   })
    // }
  }


}

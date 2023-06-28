import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AdminAuthService } from "src/app/services/auth/admin-auth.service";
import { TeacherAuthService } from "src/app/services/auth/teacher-auth.service";
import { StudentAuthService } from "src/app/services/auth/student-auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  token: string = '';
  isAdminAuthenticated = false;
  isTeacherAuthenticated = false;
  isStudentAuthenticated = false;
  private authListenerSubs: Subscription | undefined;

  constructor(private adminAuthService: AdminAuthService, private teacherAuthService: TeacherAuthService, private studentAuthService: StudentAuthService) { }

  ngOnInit() {
    let userDetail = this.studentAuthService.getLoggedInStudentInfo();
    if (userDetail) {
      // console.log(userDetail.name)
    }

    this.adminAuthService.autoAuthAdmin();
    this.isAdminAuthenticated = this.adminAuthService.getIsAuth();
    this.authListenerSubs = this.adminAuthService
      .getAuthStatusListener()
      .subscribe(isAdminAuthenticated => {
        this.isAdminAuthenticated = isAdminAuthenticated;
      });

    this.teacherAuthService.autoAuthTeacher();
    this.isTeacherAuthenticated = this.teacherAuthService.getIsAuth();
    this.authListenerSubs = this.teacherAuthService
      .getAuthStatusListener()
      .subscribe(isTeacherAuthenticated => {
        this.isTeacherAuthenticated = isTeacherAuthenticated;
      });

    this.studentAuthService.autoAuthStudent();
    this.isStudentAuthenticated = this.studentAuthService.getIsAuth();
    this.authListenerSubs = this.studentAuthService
      .getAuthStatusListener()
      .subscribe(isStudentAuthenticated => {
        this.isStudentAuthenticated = isStudentAuthenticated;
      });
  }

  onLogout(user: string) {
    if (user === 'admin') {
      this.adminAuthService.logout();
    } else if (user === 'teacher') {
      this.teacherAuthService.logout();
    } else {
      this.studentAuthService.logout();
    }
  }

  ngOnDestroy() {
    this.authListenerSubs?.unsubscribe();
  }

}

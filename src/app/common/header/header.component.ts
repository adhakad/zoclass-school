import { Component, OnInit, OnDestroy, } from "@angular/core";
import { Subscription } from "rxjs";
import { AdminAuthService } from "src/app/services/auth/admin-auth.service";
import { TeacherAuthService } from "src/app/services/auth/teacher-auth.service";
import { StudentAuthService } from "src/app/services/auth/student-auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  nav:boolean = false;

  token: string = '';
  isAdminAuthenticated = false;
  isTeacherAuthenticated = false;
  isStudentAuthenticated = false;
  private authListenerSubs: Subscription | undefined;

  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger: any;
  modulesList: any;


  ModulesList: any = [{
    label: 'User',
    children: [{
      label: 'User 1',
    }, {
      label: 'User 2',
    }, {
      label: 'User 3'
    }, {
      label: 'User 4'
    }]
  }, {
    label: 'Management',
    children: [{
      label: 'Management 1',
    }]
  }, {
    label: 'Admin',
    children: [{
      label: 'Admin 1'
    }, {
      label: 'Admin 2'
    }, {
      label: 'Admin 3'
    }, {
      label: 'Admin 4'
    }]
  }];


  constructor(private adminAuthService: AdminAuthService, private teacherAuthService: TeacherAuthService, private studentAuthService: StudentAuthService) {
    this.modulesList = this.ModulesList;
  }



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
  hamburgerMenu(val:boolean){
    if(val==true){
      this.nav = true;
    }else if(val==false){
      this.nav = false;
    }
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

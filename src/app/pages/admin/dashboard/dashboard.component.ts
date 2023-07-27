import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';

import { AdminAuthService } from 'src/app/services/auth/admin-auth.service';
import { BannerService } from 'src/app/services/banner.service';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { ClassService } from 'src/app/services/class.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StudentService } from 'src/app/services/student.service';
import { StudyMaterialService } from 'src/app/services/study-material.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { TestService } from 'src/app/services/test.service';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { TopperService } from 'src/app/services/topper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cookieValue:any;
  
  adsCountInfo:any;
  bannerCountInfo:any;
  classSubjectCountInfo:any;
  classCountInfo:any;
  notificationCountInfo:any;
  studentCountInfo:any;
  studyMaterialCountInfo:any;
  subjectCountInfo:any;
  teacherCountInfo:any;
  testCountInfo:any;
  testimonialCountInfo:any;
  topperCountInfo:any;
  classList:any[]=[];
  constructor(private adminAuthService:AdminAuthService,private adsService:AdsService,private bannerService:BannerService,private classSubjectService:ClassSubjectService,private classService:ClassService,private notificationService:NotificationService,private studentService:StudentService,private studyMaterialService:StudyMaterialService,private subjectService:SubjectService,private teacherService:TeacherService,private testService:TestService,private testimonialService:TestimonialService,private topperService:TopperService) {}
  
  ngOnInit(): void {
    console.log(this.adminAuthService.getLoggedInAdminInfo());
    this.adsCount();
    this.bannerCount();
    this.classSubjectCount();
    this.classCount();
    this.notificationCount();
    this.studentCount();
    this.studyMaterialCount();
    this.subjectCount();
    this.teacherCount();
    this.testCount();
    this.testimonialCount();
    this.topperCount();
  }


  adsCount(){
    this.adsService.getAdsCount().subscribe((res:any)=> {
      this.adsCountInfo = res.countAds;
      console.log(this.adsCountInfo)
    })
  }
  bannerCount(){
    this.bannerService.getBannerCount().subscribe((res:any)=> {
      this.bannerCountInfo = res.countBanner;
    })
  }
  classSubjectCount(){
    this.classSubjectService.getClassSubjectCount().subscribe((res:any)=> {
      this.classSubjectCountInfo = res.countClassSubject;
    })
  }
  classCount(){
    this.classService.getClassCount().subscribe((res:any)=> {
      this.classCountInfo = res.countClass;
    })
  }
  studentCount(){
    this.studentService.getStudentCount().subscribe((res:any)=> {
      this.studentCountInfo = res.countStudent;
    })
  }
  studyMaterialCount(){
    this.studyMaterialService.getStudyMaterialCount().subscribe((res:any)=> {
      this.studyMaterialCountInfo = res.countStudyMaterial;
    })
  }
  notificationCount(){
    this.notificationService.getNotificationCount().subscribe((res:any)=> {
      this.notificationCountInfo = res.countNotification;
    })
  }
  subjectCount(){
    this.subjectService.getSubjectCount().subscribe((res:any)=> {
      this.subjectCountInfo = res.countSubject;
    })
  }
  teacherCount(){
    this.teacherService.getTeacherCount().subscribe((res:any)=> {
      this.teacherCountInfo = res.countTeacher;
    })
  }
  testCount(){
    this.testService.getTestCount().subscribe((res:any)=> {
      this.testCountInfo = res.countTest;
    })
  }
  testimonialCount(){
    this.testimonialService.getTestimonialCount().subscribe((res:any)=> {
      this.testimonialCountInfo = res.countTestimonial;
    })
  }
  topperCount(){
    this.topperService.getTopperCount().subscribe((res:any)=> {
      this.topperCountInfo = res.countTopper;
    })
  }

  getAllClass(){
    this.classService.getClassList().subscribe((res:any) => {
      if(res){
        this.classList = res;
      }
    })
  }

  // admitCardVailidation(){

  // }

}

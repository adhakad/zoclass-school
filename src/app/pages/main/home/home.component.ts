import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
declare var jQuery: any;
import { isPlatformBrowser } from '@angular/common';
import { Banner } from 'src/app/modal/banner.model';
import { Subject } from 'src/app/modal/subject.model';
import { Teacher } from 'src/app/modal/teacher.model';
import { Ads } from 'src/app/modal/ads.model';
import { Topper } from 'src/app/modal/topper.model';
import { Testimonial } from 'src/app/modal/testimonial.model';
import { ClassSubject } from 'src/app/modal/class-subject.model';

import { BannerService } from 'src/app/services/banner.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { AdsService } from 'src/app/services/ads.service';
import { TopperService } from 'src/app/services/topper.service';
import { TestimonialService } from 'src/app/services/testimonial.service';
import { ClassSubjectService } from 'src/app/services/class-subject.service';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  currentYear:any;
  bannerInfo: Banner[] = [];
  subjectInfo: any[] = [];
  classSubjectInfo: ClassSubject[] = [];
  teacherInfo: Teacher[] = [];
  adsInfo: Ads[] = [];
  topperInfo: Topper[] = [];
  testimonialInfo: Testimonial[] = [];
  subjectArray: any[] = [];
  cls: Number = 0;
  loggedInStudentInfo: any;
  no: number = 0;
  loadTitle=false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private bannerService: BannerService, private subjectService: SubjectService, private classSubjectService: ClassSubjectService, private teacherService: TeacherService, private topperService: TopperService, private testimonialService: TestimonialService, private adsService: AdsService, private studentAuthService: StudentAuthService) { }

  async ngOnInit() {
    this.getLoggedInStudentInfo();
    this.getBanner();
    this.getClassSubject()
    this.getAds()
    this.getTestimonial();
    this.getTopper();
    this.getSubject();
    
    this.currentYear = (new Date()).getFullYear()
  }

  getLoggedInStudentInfo() {
    this.loggedInStudentInfo = this.studentAuthService.getLoggedInStudentInfo();
    if (this.loggedInStudentInfo) {
      this.cls = this.loggedInStudentInfo?.class;
    }
  }
  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(function () {
        jQuery('.banner-carousel').owlCarousel({
          items: 1,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: false,
          loop: true,
          dots: false,
          margin: 0,
          nav: false,
          responsiveClass: true,
        });
        jQuery('.subject-carousel').owlCarousel({
          stagePadding: 5,
          items: 3,
          loop: false,
          dots: false,
          nav: false,
          responsiveClass: true,
          responsive: {
            0: {
              stagePadding: 10,
              items: 3,
            },
            600: {
              stagePadding: 10,
              items: 3,
            },
            1500: {
              stagePadding: 30,
              items: 4,
            },
          }
        });
        jQuery('.topper-carousel').owlCarousel({
          stagePadding: 30,
          items: 2,
          loop: false,
          dots: false,
          nav: false,
          responsiveClass: true,
          responsive: {
            600:{
              stagePadding: 45,
              items: 4,
            },
            1500: {
              stagePadding: 45,
              items: 5,
            },
          }
        });
        jQuery('.ads-carousel').owlCarousel({
          stagePadding: 25,
          items: 1,
          margin: 10,
          loop: true,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: false,
          dots: false,
          nav: false,
          responsiveClass: true,
          responsive: {
            600: {
              stagePadding: 65,
              items: 2,
              margin: 40,
            },
            1500: {
              stagePadding: 65,
              items: 3,
              margin: 40,
            },
          }
        });
        jQuery('.testimonial-carousel').owlCarousel({
          stagePadding: 15,
          items: 1,
          loop: false,
          dots: false,
          nav: false,
          responsiveClass: true,
          responsive: {
            600: {
              stagePadding: 25,
              items: 3,
            },
            1500: {
              stagePadding: 25,
              items: 3,
            },
          }
        });
      },1500);
    }
  }

  getBanner() {
    this.bannerService.getBannerList().subscribe((res: Banner[]) => {
      if (res) {
        this.bannerInfo = res;
      }
    })
  }

  getSubject() {
    this.subjectService.getSubjectList().subscribe((res: Subject[]) => {
      if (res) {
        if (this.classSubjectInfo.length > 0) {
          let subjectData = res.filter(({ subject: subject1 }: any) => this.classSubjectInfo.some(({ subject: subject2 }: any) => subject1 == subject2))
          this.subjectInfo = subjectData;
          return;
        }
        this.subjectInfo = res;
      }
    })
  }
  getClassSubject() {
    this.classSubjectService.getClassSubjectList().subscribe((res: ClassSubject[]) => {
      if (res) {
        if (this.cls) {
          let classSubject = res.filter((item) => {
            return item.class == this.cls;
          })
          this.classSubjectInfo = classSubject;
        }
      }
    })
  }
  getTopper() {
    this.topperService.getTopperList().subscribe((res: Topper[]) => {
      if (res) {
        this.topperInfo = res;
        setTimeout(()=>{
          this.loadTitle=true;
        },1500)
      }
    })
  }
  getAds() {
    this.adsService.getAdsList().subscribe((res: Ads[]) => {
      if (res) {
        this.adsInfo = res;
      }
    })
  }

  getTestimonial() {
    this.testimonialService.getTestimonialList().subscribe((res: Testimonial[]) => {
      if (res) {
        this.testimonialInfo = res;
      }
    })
  }
}
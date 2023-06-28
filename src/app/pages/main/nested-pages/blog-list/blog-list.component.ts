import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { StudyMaterialService } from 'src/app/services/study-material.service';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogListDetails: any[] = [];
  date:any;
  constructor(public activatedRoute: ActivatedRoute, private studyMaterialService: StudyMaterialService, private studentAuthService: StudentAuthService) { }

  ngOnInit(): void {
    let subject = this.activatedRoute.snapshot.paramMap.get('subject');
    this.getListBlogDetails(subject);
  }
  getListBlogDetails(subject: any) {
    let loggedInStudentInfo = this.studentAuthService.getLoggedInStudentInfo();
    let cls = loggedInStudentInfo?.class;
    if (cls) {
      let data = { subject: subject, cls: cls }
      this.studyMaterialService.getBlogListByClassSubject(data).subscribe((res) => {
        if (res) {
          this.blogListDetails = res
          for (let i = 0; i < this.blogListDetails.length; i++) {
            let dateTime = this.blogListDetails[i].date;
            this.date = new Date(dateTime).toLocaleString("en-US", {
              timeZone: 'Asia/Kolkata',
              year: 'numeric',
              day: 'numeric',
              month: 'long',
            })
            this.blogListDetails[i].date = this.date;
          }
        }
      })
      return
    }
    this.studyMaterialService.getBlogListBySubject(subject).subscribe((res) => {
      if (res) {
        this.blogListDetails = res;
        for (let i = 0; i < this.blogListDetails.length; i++) {
          let dateTime = this.blogListDetails[i].date;
          this.date = new Date(dateTime).toLocaleString("en-US", {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            day: 'numeric',
            month: 'long',
          })
          this.blogListDetails[i].date = this.date;
        }
      }
    })
  }
}

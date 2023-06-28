import { Component,  OnInit } from '@angular/core';
import { StudyMaterialService } from 'src/app/services/study-material.service';
import { SubjectService } from 'src/app/services/subject.service';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {
  blogDetails: any[] = [];
  subject: any[] = [];
  date: any;
  constructor(private studyMaterialService: StudyMaterialService, private subjectService: SubjectService, private studentAuthService: StudentAuthService) { }

  async ngOnInit() {
    this.getBlogDetails();
  }

  getBlogDetails() {
    this.studyMaterialService.getStudyMaterialList().subscribe((res) => {
      if (res) {

        
          this.blogDetails = res;
          for (let i = 0; i < this.blogDetails.length; i++) {
            let dateTime = this.blogDetails[i].date;
            this.date = new Date(dateTime).toLocaleString("en-US", {
              timeZone: 'Asia/Kolkata',
              year: 'numeric',
              day: 'numeric',
              month: 'long',
            })
            this.blogDetails[i].date = this.date;
          }
      }
    })
  }

}

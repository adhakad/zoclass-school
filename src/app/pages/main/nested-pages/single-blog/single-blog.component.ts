import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyMaterialService } from 'src/app/services/study-material.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
  blogInfo:any;
  date:any;
  constructor(public activatedRoute: ActivatedRoute,private studyMaterialService:StudyMaterialService,) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.singleBlog(id);
  }

  singleBlog(id:any){
    this.studyMaterialService.getSingleBlog(id).subscribe((res) => {
      if(res){
        this.blogInfo = res;
          let dateTime = this.blogInfo.date;
          this.date = new Date(dateTime).toLocaleString("en-US", {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            day: 'numeric',
            month: 'long',
          })
          this.blogInfo.date = this.date;
      }
    })
  }

}

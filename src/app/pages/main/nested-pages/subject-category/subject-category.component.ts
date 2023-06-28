import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject-category',
  templateUrl: './subject-category.component.html',
  styleUrls: ['./subject-category.component.css']
})
export class SubjectCategoryComponent implements OnInit {
  subjectInfo:any;
  constructor(public activatedRoute: ActivatedRoute,private subjectService:SubjectService) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getSubject(id);
  }

  getSubject(id:any){
    this.subjectService.getSingleSubject(id).subscribe((res) => {
      if(res){
        this.subjectInfo = res;
      }
    })
  }
}

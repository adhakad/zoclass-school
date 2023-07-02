import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-admin-student-fees-cls',
  templateUrl: './admin-student-fees-cls.component.html',
  styleUrls: ['./admin-student-fees-cls.component.css']
})
export class AdminStudentFeesClsComponent implements OnInit {
  classInfo:any;
  constructor(public activatedRoute:ActivatedRoute,private classService:ClassService) { }

  ngOnInit(): void {
    this.getClass();
  }
  getClass(){
    this.classService.getClassList().subscribe((res:any)=>{
      if(res){
        this.classInfo = res
      }
    })
  }
}

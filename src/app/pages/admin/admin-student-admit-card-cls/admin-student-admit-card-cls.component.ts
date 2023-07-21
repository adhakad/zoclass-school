import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-admin-student-admit-card-cls',
  templateUrl: './admin-student-admit-card-cls.component.html',
  styleUrls: ['./admin-student-admit-card-cls.component.css']
})
export class AdminStudentAdmitCardClsComponent implements OnInit {
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

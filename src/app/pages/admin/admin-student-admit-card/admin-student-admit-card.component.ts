import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdmitCardService } from 'src/app/services/admit-card.service';

@Component({
  selector: 'app-admin-student-admit-card',
  templateUrl: './admin-student-admit-card.component.html',
  styleUrls: ['./admin-student-admit-card.component.css']
})
export class AdminStudentAdmitCardComponent implements OnInit {

  allAdmitCards: any[] = [];
  cls:any;

  constructor(public activatedRoute: ActivatedRoute,private admitCardService:AdmitCardService) {
    
  }

  ngOnInit(): void {
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAdmitCardStudentByClass(this.cls);
  }



  getAdmitCardStudentByClass(cls:any){
    this.admitCardService.getAllStudentAdmitCardByClass(cls).subscribe((res:any) => {
      if(res){
        this.allAdmitCards = res;
      }
    })
  }

  // getAdmitCardStudentByClass(cls:any){
  //   this.admitCardService.admitCardStudentByClass(cls).subscribe((res:any) => {
  //     if(res){
  //       this.allAdmitCards = res;
  //       console.log(this.allAdmitCards)

  //       // let dateTime = new Date();
  //       // console.log(dateTime)

  //     }
  //   })
  // }


  
    

  
  changeStatus(id:any, statusValue:any) {
    if(id) {
      let params = {
        id : id,
        statusValue: statusValue,
      }
      // console.log(this.paginationValues)
      // this.studentService.changeStatus(params).subscribe((res: any) => {
      //   if(res){
      //     this.getStudents({page : this.page});
      //   }
      // })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';


@Component({
  selector: 'app-admin-student-result-cls',
  templateUrl: './admin-student-result-cls.component.html',
  styleUrls: ['./admin-student-result-cls.component.css']
})
export class AdminStudentResultClsComponent implements OnInit {
// studentResultsInfo:any;
  // studentInfo:any;
  // testInfo:any;
  // testFilterInfo:any;
  classInfo:any;
  constructor(public activatedRoute:ActivatedRoute,private classService:ClassService) { }

  ngOnInit(): void {
    // let id = this.activatedRoute.snapshot.paramMap.get('id');
    // let cls = this.activatedRoute.snapshot.paramMap.get('cls');
    // this.testByClass(cls);
    // this.resultsByStudent(id);
    this.getClass();
  }
  getClass(){
    this.classService.getClassList().subscribe((res:any)=>{
      if(res){
        this.classInfo = res
      }
    })
  }
  // resultsByStudent(id:any){
  //   this.testResultService.resultsByStudent(id).subscribe((res:any) => {
  //     if(res){
  //       this.studentInfo = res.studentInfo;
  //       this.studentResultsInfo = res.studentResults;
  //       this.testFilterInfo = this.testInfo.filter(({_id:id1}:any) => this.studentResultsInfo.some(({testId:id2}:any) => id1 ===id2));
  //     }
  //   })
  // }


}

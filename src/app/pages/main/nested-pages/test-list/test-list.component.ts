import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentAuthService } from 'src/app/services/auth/student-auth.service';
import { TestResultService } from 'src/app/services/test-result.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  testLists:any[]=[];
  studentInfo:any;
  testList:any;
  resultsInfo:any;
  testInfo:any;
  id:any;

  constructor(public activatedRoute:ActivatedRoute,private testResultService:TestResultService,private studentAuthService:StudentAuthService,private testService:TestService) { }

  ngOnInit(): void {
    this.studentInfo = this.studentAuthService.getLoggedInStudentInfo();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.studentInfo){
      this.testByClass();
    }
   
  }

  testByClass(){
    let cls = this.studentInfo?.class;
    this.testService.testByClass(cls).subscribe((res:any) => {
      if(res){
        this.testList = res.testList;
        this.studentAllTestResultsBySubject(this.id);
      }
    })
  }
  studentAllTestResultsBySubject(id:any){
    let params = {
      subjectId:id,
      studentId:this.studentInfo?.id
    }
    this.testResultService.studentAllTestResultsBySubject(params).subscribe((res) => {
      if(res){
        this.resultsInfo = res;
        this.testInfo =  this.testList.filter(({_id:id1}:any) => this.resultsInfo.some(({testId:id2}:any) => id1 ===id2));
        console.log(this.testInfo)

      }
    })
  }

}

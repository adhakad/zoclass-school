import { Component, OnInit } from '@angular/core';
import { TestResultService } from 'src/app/services/test-result.service';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-admin-test-results',
  templateUrl: './admin-test-results.component.html',
  styleUrls: ['./admin-test-results.component.css']
})
export class AdminTestResultsComponent implements OnInit {

  testResultsInfo:any;
  testInfo:any;
  constructor(public activatedRoute:ActivatedRoute,private testResultService:TestResultService,private testService:TestService) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getSingleTestById(id);
    this.resultsByTest(id);
  }

  getSingleTestById(id:any){
    this.testService.getSingleTestById(id).subscribe((res:any) => {
      if(res){
        this.testInfo = res;
        console.log(res)
      }
    })
  }
  resultsByTest(testId:any){
    this.testResultService.resultsByTest(testId).subscribe((res:any) => {
      if(res){
        this.testResultsInfo = res;
        console.log(this.testResultsInfo)
      }
    })
  }
}

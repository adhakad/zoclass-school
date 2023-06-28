import { Component, OnInit } from '@angular/core';
import { TestResultService } from 'src/app/services/test-result.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-test-results',
  templateUrl: './teacher-test-results.component.html',
  styleUrls: ['./teacher-test-results.component.css']
})
export class TeacherTestResultsComponent implements OnInit {
  testResultsInfo: any;
  constructor(public activatedRoute: ActivatedRoute, private testResultService: TestResultService) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.resultsByTest(id);
  }
  resultsByTest(testId: any) {
    this.testResultService.resultsByTest(testId).subscribe((res: any) => {
      if (res) {
        this.testResultsInfo = res;
      }
    })
  }
}

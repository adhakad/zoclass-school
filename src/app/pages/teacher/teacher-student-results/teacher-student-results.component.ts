import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestResultService } from 'src/app/services/test-result.service';

@Component({
  selector: 'app-teacher-student-results',
  templateUrl: './teacher-student-results.component.html',
  styleUrls: ['./teacher-student-results.component.css']
})
export class TeacherStudentResultsComponent implements OnInit {
  studentResultsInfo: any;
  studentInfo: any;
  constructor(public activatedRoute: ActivatedRoute, private testResultService: TestResultService) { }

  ngOnInit(): void {
    this.resultsByStudent();
  }

  resultsByStudent() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.testResultService.resultsByStudent(id).subscribe((res: any) => {
      if (res) {
        this.studentInfo = res.studentInfo;
        this.studentResultsInfo = res.studentResults;
      }
    })
  }

}

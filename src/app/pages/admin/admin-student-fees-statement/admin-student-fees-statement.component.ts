import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeesStructureService } from 'src/app/services/fees-structure.service';
import { FeesService } from 'src/app/services/fees.service';

@Component({
  selector: 'app-admin-student-fees-statement',
  templateUrl: './admin-student-fees-statement.component.html',
  styleUrls: ['./admin-student-fees-statement.component.css']
})
export class AdminStudentFeesStatementComponent implements OnInit {
  cls: any;
  clsFeesStructure: any;
  studentFeesCollection:any;
  rollNumber: any;
  constructor(public activatedRoute: ActivatedRoute, private feesService: FeesService, private feesStructureService: FeesStructureService) { }

  ngOnInit(): void {
    this.cls = this.activatedRoute.snapshot.paramMap.get('id');
    this.rollNumber = this.activatedRoute.snapshot.paramMap.get('rollnumber');
    this.singleStudentFeesCollection(this.cls, this.rollNumber)
    this.feesStructureByClass(this.cls)
  }

  singleStudentFeesCollection(cls: any, rollNumber: any) {
    this.feesService.singleStudentFeesCollection(cls, rollNumber).subscribe((res: any) => {
      if (res) {
        this.studentFeesCollection = res;
        console.log(res)
      }
    })
  }

  feesStructureByClass(cls: any) {
    this.feesStructureService.feesStructureByClass(cls).subscribe((res: any) => {
      if (res) {
        this.clsFeesStructure = res;
        console.log(res)
      }
    })
  }

}

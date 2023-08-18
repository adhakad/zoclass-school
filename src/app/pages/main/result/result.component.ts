import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamResultService } from 'src/app/services/exam-result.service';
import { ClassService } from 'src/app/services/class.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  errorMsg: string = '';
  examResultForm: FormGroup;
  classInfo: any;
  studentInfo: any[]=[];
  examResultInfo: any;
  resultStructureInfo: any;
  processedData: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private examResultService: ExamResultService, private classService: ClassService) {
    this.examResultForm = this.fb.group({
      resultNo: ['', Validators.required],
      class: ['', Validators.required],
      rollNumber: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.getClass();
  }

  getClass() {
    this.classService.getClassList().subscribe((res: any) => {
      if (res) {
        this.classInfo = res;
      }
    })
  }
  examResult() {
    this.examResultService.singleStudentExamResult(this.examResultForm.value).subscribe((res: any) => {
      if (res) {
        this.studentInfo = res.studentInfo;
        let examResult = res.examResult;
        this.resultStructureInfo = res.examResultStructure;

        this.examResultInfo = {
          rollNumber: examResult.rollNumber,
          class: examResult.class,
          resultNo: examResult.resultNo,
          examType: examResult.examType,
          theoryMarks: examResult.theoryMarks.map((subjectMarks:any) => {
            const subjectName = Object.keys(subjectMarks)[0];
            const maxMarksObject = this.resultStructureInfo.theoryMaxMarks.find((maxMark:any) => Object.keys(maxMark)[0] === subjectName);
            const maxMarks = maxMarksObject ? maxMarksObject[subjectName] : 'N/A';
            return {
              subject: subjectName,
              marksObtained: subjectMarks[subjectName],
              maxMarks: maxMarks
            };

          })
        };

        console.log(this.examResultInfo)

        
        

        this.processData();
      }
    }, err => {
      this.errorMsg = err.error.errorMsg;
    })
  }
  processData() {
    for (let i = 0; i < this.resultStructureInfo.examDate.length; i++) {
      const subject = Object.keys(this.resultStructureInfo.examDate[i])[0];
      const date = Object.values(this.resultStructureInfo.examDate[i])[0];
      const startTime = Object.values(this.resultStructureInfo.examStartTime[i])[0];
      const endTime = Object.values(this.resultStructureInfo.examEndTime[i])[0];

      this.processedData.push({
        subject,
        date,
        timing: `${startTime} to ${endTime}`
      });
    }
  }


}

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
  studentInfo: any;
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

        let grandTotalMarks = 0;
        let percentileGrade: string = "";
        let percentile:number = 0;
        if (examResult.practicalMarks) {
          this.examResultInfo = {};
          const totalTheoryMaxMarks: number = examResult.theoryMarks.reduce((total: number, subjectMarks: any) => {
            const subjectName: string = Object.keys(subjectMarks)[0];
            const maxMarksObject: any = this.resultStructureInfo.theoryMaxMarks.find((maxMarks: any) => Object.keys(maxMarks)[0] === subjectName);
            const maxMarks: number = maxMarksObject ? parseFloat(maxMarksObject[subjectName]) : 0;
  
            return total + maxMarks;
          }, 0);
  
          const totalPracticalMaxMarks: number = examResult.practicalMarks.reduce((total: number, subjectMarks: any) => {
            const subjectName: string = Object.keys(subjectMarks)[0];
            const maxMarksObject: any = this.resultStructureInfo.practicalMaxMarks.find((maxMarks: any) => Object.keys(maxMarks)[0] === subjectName);
            const maxMarks: number = maxMarksObject ? parseFloat(maxMarksObject[subjectName]) : 0;
  
            return total + maxMarks;
          }, 0);
  
          const totalMaxMarks: number = totalTheoryMaxMarks + totalPracticalMaxMarks;


          this.examResultInfo = {
            class: examResult.class,
            examType: examResult.examType,
            rollNumber: examResult.rollNumber,
            resultNo: examResult.resultNo,
            marks: examResult.theoryMarks.map((subjectMarks: any) => {
              const subjectName = Object.keys(subjectMarks)[0];
              const theoryMarks = parseFloat(subjectMarks[subjectName]);
              const practicalMarkObject = examResult.practicalMarks.find((practicalMark: any) => Object.keys(practicalMark)[0] === subjectName);
              const practicalMark = practicalMarkObject ? parseFloat(practicalMarkObject[subjectName]) : 0;
              const totalMarks = theoryMarks + practicalMark;

              let grade = '';
              const gradeMaxMarks = this.resultStructureInfo.gradeMaxMarks;
              const gradeMinMarks = this.resultStructureInfo.gradeMinMarks;
              for (let i = 0; i < gradeMaxMarks.length; i++) {
                const gradeRange: any = Object.values(gradeMaxMarks[i])[0];
                if (totalMarks >= gradeMinMarks[i][Object.keys(gradeMinMarks[i])[0]] &&
                  totalMarks <= gradeRange) {
                  grade = Object.keys(gradeMaxMarks[i])[0];
                  break;
                }
              }
              grandTotalMarks += totalMarks;


              percentile = (grandTotalMarks / totalMaxMarks) * 100;
              for (let i = 0; i < this.resultStructureInfo.gradeMaxMarks.length; i++) {
                const gradeMax: number = parseFloat(String(Object.values(this.resultStructureInfo.gradeMaxMarks[i])[0]));
                const gradeMin: number = parseFloat(String(Object.values(this.resultStructureInfo.gradeMinMarks[i])[0]));

                if (!isNaN(gradeMax) && !isNaN(gradeMin)) {
                  if (percentile >= gradeMin && percentile <= gradeMax) {
                    percentileGrade = Object.keys(this.resultStructureInfo.gradeMaxMarks[i])[0];
                    break;
                  }
                }
              }

              return {
                subject: subjectName,
                theoryMarks: theoryMarks,
                practicalMarks: practicalMark,
                totalMarks: totalMarks,
                grade: grade,
              };
            })
          };
          this.examResultInfo.grandTotalMarks = grandTotalMarks;
          this.examResultInfo.totalMaxMarks = totalMaxMarks;
          this.examResultInfo.percentile = parseFloat(percentile.toFixed(2))
          this.examResultInfo.percentileGrade = percentileGrade;
        }
        if (!examResult.practicalMarks) {
          this.examResultInfo = {};

          const totalTheoryMaxMarks: number = examResult.theoryMarks.reduce((total: number, subjectMarks: any) => {
            const subjectName: string = Object.keys(subjectMarks)[0];
            const maxMarksObject: any = this.resultStructureInfo.theoryMaxMarks.find((maxMarks: any) => Object.keys(maxMarks)[0] === subjectName);
            const maxMarks: number = maxMarksObject ? parseFloat(maxMarksObject[subjectName]) : 0;
  
            return total + maxMarks;
          }, 0);
  
          const totalPracticalMaxMarks: number = 0;
  
          const totalMaxMarks: number = totalTheoryMaxMarks + totalPracticalMaxMarks;


          this.examResultInfo = {
            class: examResult.class,
            examType: examResult.examType,
            rollNumber: examResult.rollNumber,
            resultNo: examResult.resultNo,
            marks: examResult.theoryMarks.map((subjectMarks: any) => {
              const subjectName = Object.keys(subjectMarks)[0];
              const theoryMarks = parseFloat(subjectMarks[subjectName])
              const practicalMark = 0;
              const totalMarks = theoryMarks + practicalMark;
              let grade = '';
              const gradeMaxMarks = this.resultStructureInfo.gradeMaxMarks;
              const gradeMinMarks = this.resultStructureInfo.gradeMinMarks;
              for (let i = 0; i < gradeMaxMarks.length; i++) {
                const gradeRange: any = Object.values(gradeMaxMarks[i])[0];
                if (totalMarks >= gradeMinMarks[i][Object.keys(gradeMinMarks[i])[0]] &&
                  totalMarks <= gradeRange) {
                  grade = Object.keys(gradeMaxMarks[i])[0];
                  break;
                }
              }
              grandTotalMarks += totalMarks;
              percentile = (grandTotalMarks / totalMaxMarks) * 100;
              for (let i = 0; i < this.resultStructureInfo.gradeMaxMarks.length; i++) {
                const gradeMax: number = parseFloat(String(Object.values(this.resultStructureInfo.gradeMaxMarks[i])[0]));
                const gradeMin: number = parseFloat(String(Object.values(this.resultStructureInfo.gradeMinMarks[i])[0]));

                if (!isNaN(gradeMax) && !isNaN(gradeMin)) {
                  if (percentile >= gradeMin && percentile <= gradeMax) {
                    percentileGrade = Object.keys(this.resultStructureInfo.gradeMaxMarks[i])[0];
                    break;
                  }
                }
              }
              return {
                subject: subjectName,
                theoryMarks: theoryMarks,
                practicalMarks: practicalMark,
                totalMarks: totalMarks,
                grade: grade,
              };
            })
          };
          this.examResultInfo.grandTotalMarks = grandTotalMarks;
          this.examResultInfo.totalMaxMarks = totalMaxMarks;
          this.examResultInfo.percentile = parseFloat(percentile.toFixed(2));
          this.examResultInfo.percentileGrade = percentileGrade;
        }
      }
    }, err => {
      this.errorMsg = err.error.errorMsg;
    })
  }
}

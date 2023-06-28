import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestResultService {
  url = 'http://localhost:3000/api/test-result';
  constructor(private http: HttpClient) { }

  addTestResult(resultData: any) {
    return this.http.post(this.url, resultData);
  }
  resultsByStudent(studentId: any) {
    return this.http.get(`${this.url}/student-results/${studentId}`);
  }
  singleTestResult(studentId: any) {
    return this.http.get(`${this.url}/${studentId}`);
  }
  resultsByTest(testId:any){
    return this.http.get(`${this.url}/test-results/${testId}`);
  }
  studentSingleTestResult(params:any){
    return this.http.get(`${this.url}/test/${params.testId}/student/${params.studentId}`);
  }
  studentAllTestResultsBySubject(params:any){
    return this.http.get(`${this.url}/test/subject/${params.subjectId}/student/${params.studentId}`);
  }
}

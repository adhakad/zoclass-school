import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {
  url = 'http://localhost:3000/api/exam-result';
  constructor(private http: HttpClient) { }

  addExamResult(userForm:any) {
    // console.log(userForm);
    return this.http.post(`${this.url}`,userForm);
  }
  addBulkExamResult(examBulkResult:any) {
    return this.http.post(`${this.url}/bulk-exam-result`,examBulkResult);
  }
  examResultPaginationList(examResultData:any){
    return this.http.post(`${this.url}/exam-result-pagination`,examResultData);
  }
  updateExamResult(examForm:any){
    return this.http.put(`${this.url}`,examForm);
  }
  resultsByClass(cls: any) {
    return this.http.get(`${this.url}/student-results/${cls}`);
  }
  deleteExamResult(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }
  
}
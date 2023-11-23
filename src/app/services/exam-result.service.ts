import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {
  url = `${environment.API_URL}/v1/exam-result`;
  constructor(private http: HttpClient) { }

  addExamResult(userForm:any) {
    // console.log(userForm);
    return this.http.post(`${this.url}`,userForm);
  }
  addBulkExamResult(examBulkResult:any) {
    return this.http.post(`${this.url}/bulk-exam-result`,examBulkResult);
  }
  singleStudentExamResult(examResultFormData: any) {
    return this.http.post(`${this.url}/result`,examResultFormData);
  }
  singleStudentExamResultById(studentId: any) {
    return this.http.get(`${this.url}/student/${studentId}`);
  }
  getAllStudentExamResultByClass(cls:any){
    return this.http.get(`${this.url}/class/${cls}`);
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
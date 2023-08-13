import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamResultStructureService {
  url = 'http://localhost:3000/api/exam-result-structure';
  constructor(private http: HttpClient) { }

  addExamResultStructure(examResultForm:any) {
    console.log(examResultForm)
    return this.http.post(`${this.url}`,examResultForm);
  }
  examResultStructureByClass(cls: any) {
    return this.http.get(`${this.url}/${cls}`);
  }

  // addBulkExamResult(examResultBulkResult:any) {
  //   return this.http.post(`${this.url}/bulk-examResult`,examResultBulkResult);
  // }
  
  // deleteExamResult(id:any){
  //   return this.http.delete(`${this.url}/${id}`);
  // }
}

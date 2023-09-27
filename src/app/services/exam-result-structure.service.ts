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
  getSingleClassResultStrucByStream(params: any) {
    return this.http.get(`${this.url}/class/${params.cls}/stream/${params.stream}/exam/${params.examType}`);
  }

  // addBulkExamResult(examResultBulkResult:any) {
  //   return this.http.post(`${this.url}/bulk-examResult`,examResultBulkResult);
  // }
  
  deleteResultStructure(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }
}

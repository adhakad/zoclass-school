import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClassSubject } from '../modal/class-subject.model';

@Injectable({
  providedIn: 'root'
})
export class ClassSubjectService {
  url = 'http://localhost:3000/api/class-subject';
  constructor(private http:HttpClient) { }

  addClassSubject(classSubjectData:ClassSubject){
    return this.http.post(this.url,classSubjectData);
  }
  getClassSubjectList() {
    return this.http.get<ClassSubject[]>(this.url);
  }
  getClassSubjectCount() {
    return this.http.get(`${this.url}/class-subject-count`);
  }
  getSubjectByClass(cls:any) {
    return this.http.get<ClassSubject[]>(`${this.url}/subject/${cls}`);
  }
  classSubjectPaginationList(classSubjectData:any){
    return this.http.post(`${this.url}/classSubject-pagination`,classSubjectData);
  }
  updateClassSubject(classSubjectData:ClassSubject){
    return this.http.put(`${this.url}/${classSubjectData._id}`, classSubjectData);
  }
  deleteClassSubject(id:String){
    return this.http.delete(`${this.url}/${id}`);
  }
}

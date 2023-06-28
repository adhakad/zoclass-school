import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../modal/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  url = 'http://localhost:3000/api/subject';
  constructor(private http: HttpClient) { }

  addSubject(subjectData: Subject) {
    var formData: any = new FormData();
    formData.append('image', subjectData.image);
    formData.append('subject', subjectData.subject);
    return this.http.post(this.url, formData);
  }
  getSubjectList() {
    return this.http.get<Subject[]>(this.url);
  }
  getSubjectCount() {
    return this.http.get(`${this.url}/subject-count`);
  }
  getSingleSubject(id: any) {
    return this.http.get<Subject[]>(`${this.url}/${id}`);
  }
  getSingleSubjectBySubject(subject: any) {
    return this.http.get<any>(`${this.url}/subject/${subject}`);
  }
  subjectPaginationList(subjectData: any) {
    return this.http.post(`${this.url}/subject-pagination`, subjectData);
  }
  updateSubject(subjectData: Subject) {
    return this.http.put(`${this.url}/${subjectData._id}`, subjectData);
  }
  deleteSubject(id: String) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

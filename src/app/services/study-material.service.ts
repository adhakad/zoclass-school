import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentAuthService } from './auth/student-auth.service';


@Injectable({
  providedIn: 'root'
})
export class StudyMaterialService {
  url = 'http://localhost:3000/api/study-material';
  loggedInStudentInfo: any;
  cls: number = 12345;
  constructor(private http: HttpClient, private studentAuthService: StudentAuthService) { }

  addStudyMaterial(studyMaterialData: any) {
    return this.http.post(this.url, studyMaterialData);
  }
  getStudyMaterialList() {
    return this.http.get<any>(this.url);
  }
  getStudyMaterialCount() {
    return this.http.get(`${this.url}/study-material-count`);
  }
  getBlogListBySubject(subject: any) {
    return this.http.get<any>(`${this.url}/subject/${subject}/${12345}`);
  }
  getBlogListByClassSubject(data: any) {
    return this.http.get<any>(`${this.url}/class-subject/${data.cls}/${data.subject}`);
  }

  getSingleBlog(id: any) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  studyMaterialPaginationList(studyMaterialData: any) {
    return this.http.post(`${this.url}/study-material-pagination`, studyMaterialData);
  }
  updateStudyMaterial(studyMaterialData: any) {
    return this.http.put(`${this.url}/${studyMaterialData._id}`, studyMaterialData);
  }
  deleteStudyMaterial(id: String) {
    return this.http.delete(`${this.url}/${id}`);
  }
}

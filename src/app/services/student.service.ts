import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../modal/student.modal';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url = 'http://localhost:3000/api/student';
  constructor(private http:HttpClient) { }

  addStudent(studentData:any){
    return this.http.post(this.url,studentData);
  }
  getStudentList() {
    return this.http.get<Student[]>(this.url);
  }
  getStudentByClass(cls:any){
    return this.http.get(`${this.url}/student/${cls}`);
  }
  getStudentCount() {
    return this.http.get(`${this.url}/student-count`);
  }
  studentPaginationList(studentData:any){
    return this.http.post(`${this.url}/student-pagination`,studentData);
  }
  updateStudent(studentData:any){
    return this.http.put(`${this.url}/${studentData._id}`, studentData);
  }
  changeStatus(params:any){
    return this.http.put(`${this.url}/status/${params.id}`,params);
  }
  deleteStudent(id:String){
    return this.http.delete(`${this.url}/${id}`);
  }
}

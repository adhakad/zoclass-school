import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Class } from '../modal/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  url = 'http://localhost:3000/api/class';
  constructor(private http:HttpClient) { }

  addClass(classData:Class){
    return this.http.post(this.url,classData);
  }
  getClassList() {
    return this.http.get<Class[]>(this.url);
  }
  getClassCount() {
    return this.http.get(`${this.url}/class-count`);
  }
  classPaginationList(classData:any){
    return this.http.post(`${this.url}/class-pagination`,classData);
  }
  updateClass(classData:Class){
    return this.http.put(`${this.url}/${classData._id}`, classData);
  }
  deleteClass(id:String){
    return this.http.delete(`${this.url}/${id}`);
  }
}

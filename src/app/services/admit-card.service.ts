import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmitCardService {
  url = 'http://localhost:3000/api/admit-card';
  constructor(private http: HttpClient) { }

  admitCardStudentByClass(cls: any) {
    return this.http.get(`${this.url}/${cls}`);
  }
  getAllStudentAdmitCardByClass(cls:any){
    return this.http.get(`${this.url}/class/${cls}`);
  }
  singleStudentAdmitCardById(id: any) {
    return this.http.get(`${this.url}/student/${id}`);
  }
  singleStudentAdmitCard(admitCardFormData: any) {
    return this.http.post(`${this.url}`,admitCardFormData);
  }
  changeStatus(params:any){
    return this.http.put(`${this.url}/status/${params.id}`,params);
  }
}

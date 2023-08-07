import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
  url = 'http://localhost:3000/api/admission';
  constructor(private http:HttpClient) { }

  addAdmission(feesForm:any) {
    console.log(feesForm)
    return this.http.post(`${this.url}`,feesForm);
  }
  getAdmissionList() {
    return this.http.get<any>(this.url);
  }
  getAdmissionCount() {
    return this.http.get(`${this.url}/admission-count`);
  }
  admissionPaginationList(admissionData:any){
    return this.http.post(`${this.url}/admission-pagination`,admissionData);
  }
  updateAdmission(admissionData:any){
    return this.http.put(`${this.url}/${admissionData._id}`, admissionData);
  }
  changeStatus(params:any){
    return this.http.put(`${this.url}/status/${params.id}`,params);
  }
  deleteAdmission(id:String){
    return this.http.delete(`${this.url}/${id}`);
  }
}

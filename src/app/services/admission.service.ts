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
}

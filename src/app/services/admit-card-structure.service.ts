import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmitCardStructureService {
  url = 'http://localhost:3000/api/admit-card-structure';
  constructor(private http: HttpClient) { }

  addAdmitCardStructure(feesForm:any) {
    console.log(feesForm)
    return this.http.post(`${this.url}`,feesForm);
  }
  admitCardStructureByClass(cls: any) {
    return this.http.get(`${this.url}/${cls}`);
  }


  // updateFees(feesForm:any){
  //   return this.http.put(`${this.url}`,feesForm);
  // }
  
  // deleteFees(id:any){
  //   return this.http.delete(`${this.url}/${id}`);
  // }
}


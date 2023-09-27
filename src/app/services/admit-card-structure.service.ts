import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmitCardStructureService {
  url = 'http://localhost:3000/api/admit-card-structure';
  constructor(private http: HttpClient) { }

  addAdmitCardStructure(formData:any) {
    return this.http.post(`${this.url}`,formData);
  }
  admitCardStructureByClass(cls: any) {
    return this.http.get(`${this.url}/${cls}`);
  }
  
  deleteAdmitCardStructure(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }
}


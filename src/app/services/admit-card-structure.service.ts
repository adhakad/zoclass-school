import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdmitCardStructureService {
  url = `${environment.API_URL}/v1/admit-card-structure`;
  constructor(private http: HttpClient) { }

  addAdmitCardStructure(formData:any) {
    return this.http.post(`${this.url}`,formData);
  }
  admitCardStructureByClass(cls: any) {
    return this.http.get(`${this.url}/${cls}`);
  }
  changeAdmitCardPublishStatus(params:any){
    return this.http.put(`${this.url}/admitcard-publish-status/${params.id}`,params);
  }
  deleteAdmitCardStructure(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }
}


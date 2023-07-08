import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FeesStructureService {
  url = 'http://localhost:3000/api/fees-structure';
  constructor(private http: HttpClient) { }

  addFeesStructure(feesForm:any) {
    console.log(feesForm)
    return this.http.post(`${this.url}`,feesForm);
  }
  feesStructureByClass(cls: any) {
    return this.http.get(`${this.url}/${cls}`);
  }

  addBulkFees(feesBulkResult:any) {
    return this.http.post(`${this.url}/bulk-fees`,feesBulkResult);
  }
  // feesPaginationList(feesData:any){
  //   return this.http.post(`${this.url}/fees-pagination`,feesData);
  // }
  // updateFees(feesForm:any){
  //   return this.http.put(`${this.url}`,feesForm);
  // }
  
  // deleteFees(id:any){
  //   return this.http.delete(`${this.url}/${id}`);
  // }
}

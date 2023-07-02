import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FeesService {
  url = 'http://localhost:3000/api/fees';
  constructor(private http: HttpClient) { }

  addFees(feesForm:any) {
    console.log(feesForm)
    return this.http.post(`${this.url}`,feesForm);
  }
  addBulkFees(feesBulkResult:any) {
    return this.http.post(`${this.url}/bulk-fees`,feesBulkResult);
  }
  feesPaginationList(feesData:any){
    return this.http.post(`${this.url}/fees-pagination`,feesData);
  }
  updateFees(feesForm:any){
    return this.http.put(`${this.url}`,feesForm);
  }
  resultsByClass(cls: any) {
    return this.http.get(`${this.url}/student-results/${cls}`);
  }
  deleteFees(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }
  
}
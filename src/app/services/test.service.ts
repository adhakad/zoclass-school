import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private url = `http://localhost:3000/api/test`;
  constructor(private http : HttpClient) { }

  getTestList() {
    return this.http.get<any>(this.url);
  }
  getTestCount() {
    return this.http.get(`${this.url}/test-count`);
  }
  testByClass(cls:any){
    return this.http.get(`${this.url}/test/${cls}`);
  }
  testPaginationList(testData:any){
    return this.http.post(`${this.url}/test-pagination`,testData);
  }
  getSingleTest(id:Number){
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  getSingleTestById(id:any){
    return this.http.get(`${this.url}/single-test/${id}`);
  }
  addQuizDetail(data:any){
    return this.http.post(this.url, data,);
  }
  testDelete(id:String){
    return this.http.delete(`${this.url}/${id}`);
  }
}
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private url = `http://localhost:3000/api/question`;
  
  constructor(private http : HttpClient) { }

  getSingleTestQuestions(id:any){
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addSelectAnswer(saveQueAnswerList:any){
    return this.http.post(`${this.url}/saveAnswer`, saveQueAnswerList);
  }

  createQuetions(data:any,testId:any){
    console.log(testId)
    let datas = [];
    datas.push({testId:testId,data})
    return this.http.post(this.url, datas);
  }
}

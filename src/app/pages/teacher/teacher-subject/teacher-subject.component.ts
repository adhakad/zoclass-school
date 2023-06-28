import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';
@Component({
  selector: 'app-teacher-subject',
  templateUrl: './teacher-subject.component.html',
  styleUrls: ['./teacher-subject.component.css']
})
export class TeacherSubjectComponent implements OnInit {

  subjectInfo: any[] = [];

  recordLimit: number = 5;
  filters: any = {};
  number: number = 0;
  paginationValues: Subject<any> = new Subject();
  constructor( private subjectService:SubjectService ) {}

  ngOnInit(): void {
    this.getSubject({page:1});
  }

  getSubject($event:any) {
    return new Promise((resolve, reject) => {
      let params:any = {
        filters: {},
        page: $event.page,
        limit: $event.limit ? $event.limit : this.recordLimit
      };
      this.recordLimit = params.limit;
      if(this.filters.searchText) {
        params["filters"]["searchText"] = this.filters.searchText.trim();
      }
      
      this.subjectService.subjectPaginationList(params).subscribe((res: any) => {
        if (res) {
          this.subjectInfo = res.subjectList;
          this.number = params.page;
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.countSubject });
          return resolve(true);
        }
      });
    });
  }

}

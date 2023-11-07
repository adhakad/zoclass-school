import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Subject } from 'rxjs';
import { Class } from 'src/app/modal/class.model';
// import { Subject } from 'src/app/modal/subject.model';
import { ClassSubject } from 'src/app/modal/class-subject.model';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { ClassSubjectService } from 'src/app/services/class-subject.service';

@Component({
  selector: 'app-class-subject',
  templateUrl: './class-subject.component.html',
  styleUrls: ['./class-subject.component.css']
})
export class ClassSubjectComponent implements OnInit {
  cls:any;
  classSubjectForm: FormGroup;
  showModal: boolean = false;
  updateMode: boolean = false;
  deleteMode: boolean = false;
  deleteById: String = '';
  successMsg: String = '';
  errorMsg: String = '';
  errorCheck: Boolean = false;
  classInfo: any[] = [];
  subjectInfo: any[] = [];
  classSubjectInfo: any[] = [];
  selectedSubjectGroup: any[] = [];
  streamMainSubject: any[] = ['Mathematics(Science)','Biology(Science)','History(Arts)','Sociology(Arts)','Political Science(Arts)','Accountancy(Commerce)','Economics(Commerce)'];

  recordLimit: number = 5;
  filters:any = {};
  number:number=0;
  paginationValues: Subject<any> = new Subject();
  loader:Boolean=true;
  constructor(private fb: FormBuilder,private classService:ClassService, private subjectService: SubjectService,private classSubjectService:ClassSubjectService) {
    this.classSubjectForm = this.fb.group({
      _id: [''],
      class:['',Validators.required],
      subject:[''],
      stream:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.getClass();
    this.getSubject();
    let load:any=this.getClassSubject({page:1});
    if(load){
      setTimeout(()=>{
        this.loader = false;
      },1000);
    }
  }

  closeModal() {
    this.showModal = false;
    this.updateMode = false;
    this.deleteMode = false;
    this.errorMsg = '';
    this.selectedSubjectGroup = [];
    this.classSubjectForm.reset();
  }
  addClassSubjectModel() {
    this.showModal = true;
    this.deleteMode = false;
    this.classSubjectForm.reset();
  }
  updateClassSubjectModel(classSubject: any) {
    this.showModal = true;
    this.deleteMode = false;
    this.updateMode = true;
    this.classSubjectForm.patchValue(classSubject);
  }
  deleteClassSubjectModel(id: String) {
    this.showModal = true;
    this.updateMode = false;
    this.deleteMode = true;
    this.deleteById = id;
  }

  successDone() {
    setTimeout(() => {
      this.closeModal();
      this.successMsg = '';
      this.getClassSubject({page:1});
    }, 1000)
  }

  subjectGroup(option: any) {
    const index = this.selectedSubjectGroup.indexOf(option);
    if (index > -1) {
      this.selectedSubjectGroup.splice(index, 1);
    } else {
      this.selectedSubjectGroup.push(option)
    }
  }

  chooseClass(cls:any){
    this.cls = cls;
    console.log(this.cls)
  }

  getClass() {
    this.classService.getClassList().subscribe((res: any) => {
      if (res) {
        this.classInfo = res;
      }
    })
  }
  getSubject() {
    this.subjectService.getSubjectList().subscribe((res: any) => {
      if (res) {
        this.subjectInfo = res;
      }
    })
  }

  getClassSubject($event:any) {
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
      
      this.classSubjectService.classSubjectPaginationList(params).subscribe((res: any) => {
        if (res) {
          this.classSubjectInfo = res.classSubjectList;
          this.number = params.page;
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.countClassSubject });
          return resolve(true);
        }
      });
    });
  }

  classSubjectAddUpdate() {
    if (this.classSubjectForm.valid) {
      if (this.updateMode) {
        this.classSubjectService.updateClassSubject(this.classSubjectForm.value).subscribe((res: any) => {
          if (res) {
            this.successDone();
            this.successMsg = res;
          }
        }, err => {
          this.errorCheck = true;
          this.errorMsg = err.error;
        })
      } else {
        this.classSubjectForm.value.subject = this.selectedSubjectGroup;
        this.classSubjectService.addClassSubject(this.classSubjectForm.value).subscribe((res: any) => {
          if (res) {
            this.successDone();
            this.successMsg = res;
          }
        }, err => {
          this.errorCheck = true;
          this.errorMsg = err.error;
        })
      }
    }
  }

  classSubjectDelete(id: String) {
    this.classSubjectService.deleteClassSubject(id).subscribe((res: any) => {
      if (res) {
        this.successDone();
        this.successMsg = res;
        this.deleteById = '';
      }
    })
  }
}

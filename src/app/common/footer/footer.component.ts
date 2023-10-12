import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: any;
  schoolInfo:any;
  constructor(private schoolService:SchoolService) { }

  ngOnInit(): void {
    this.getSchool();
    this.currentYear = (new Date()).getFullYear();
  }
  softwareCompany(){
    window.location.href = 'https://www.linkedin.com/in/abhishek-dhakad-53360216b';
  }
  getSchool(){
    this.schoolService.getSchool().subscribe((res:any)=> {
      if(res){
        this.schoolInfo = res;
      }
    })
  }

}

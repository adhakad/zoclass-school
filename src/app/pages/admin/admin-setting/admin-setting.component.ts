import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.css']
})
export class AdminSettingComponent implements OnInit {
  loader:Boolean=true;
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loader = false;
  },1000)
  }

}

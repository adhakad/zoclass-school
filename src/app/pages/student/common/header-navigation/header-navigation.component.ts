import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.css']
})
export class HeaderNavigationComponent implements OnInit {
  nav:boolean = false;
  constructor() {}

  ngOnInit(): void {
  }

  openMenu(val:boolean){
    if(val==true){
      this.nav = true;
    }else if(val==false){
      this.nav = false;
    }
    
  }
}

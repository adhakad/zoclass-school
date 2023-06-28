import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MaterialUiModule } from 'src/app/material/material-ui/material-ui.module';
import { HomeRoutingModule } from 'src/app/pages/main/home/home-routing.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialUiModule,
    HomeRoutingModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }

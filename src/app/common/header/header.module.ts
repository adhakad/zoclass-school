import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialUiModule } from 'src/app/material/material-ui/material-ui.module';
import { HomeRoutingModule } from 'src/app/pages/main/home/home-routing.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialUiModule,
    HomeRoutingModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }

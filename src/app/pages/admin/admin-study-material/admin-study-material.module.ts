import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStudyMaterialRoutingModule } from './admin-study-material-routing.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { AdminStudyMaterialComponent } from './admin-study-material.component';


@NgModule({
  declarations: [
    AdminStudyMaterialComponent
  ],
  imports: [
    CommonModule,
    AdminStudyMaterialRoutingModule,
    AdminSharedModule,
  ]
})
export class AdminStudyMaterialModule { 
  constructor(){
    console.log("admin study material module")
  }
}

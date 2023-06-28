import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStudentResultClsRoutingModule } from './admin-student-result-cls-routing.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { AdminStudentResultClsComponent } from './admin-student-result-cls.component';


@NgModule({
  declarations: [
    AdminStudentResultClsComponent
  ],
  imports: [
    CommonModule,
    AdminStudentResultClsRoutingModule,
    AdminSharedModule
  ]
})
export class AdminStudentResultClsModule {
  constructor(){
    console.log("admin student result class module")
  }
 }

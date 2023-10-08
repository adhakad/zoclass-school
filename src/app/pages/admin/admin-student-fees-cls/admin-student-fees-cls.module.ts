import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStudentFeesClsRoutingModule } from './admin-student-fees-cls-routing.module';
import { AdminStudentFeesClsComponent } from './admin-student-fees-cls.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';

@NgModule({
  declarations: [
    AdminStudentFeesClsComponent,
  ],
  imports: [
    CommonModule,
    AdminStudentFeesClsRoutingModule,
    AdminSharedModule
  ]
})
export class AdminStudentFeesClsModule {
  constructor(){
    console.log("admin student fees class module")
  }
 }

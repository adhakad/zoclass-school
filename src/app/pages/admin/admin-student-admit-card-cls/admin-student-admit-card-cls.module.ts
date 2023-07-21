import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStudentAdmitCardClsRoutingModule } from './admin-student-admit-card-cls-routing.module';
import { AdminStudentAdmitCardClsComponent } from './admin-student-admit-card-cls.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';


@NgModule({
  declarations: [
    AdminStudentAdmitCardClsComponent
  ],
  imports: [
    CommonModule,
    AdminStudentAdmitCardClsRoutingModule,
    AdminSharedModule
  ]
})
export class AdminStudentAdmitCardClsModule { }

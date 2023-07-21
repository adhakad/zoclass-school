import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStudentAdmissionRoutingModule } from './admin-student-admission-routing.module';
import { AdminStudentAdmissionComponent } from './admin-student-admission.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';


@NgModule({
  declarations: [
    AdminStudentAdmissionComponent
  ],
  imports: [
    CommonModule,
    AdminStudentAdmissionRoutingModule,
    AdminSharedModule
  ]
})
export class AdminStudentAdmissionModule { }

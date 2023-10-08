import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { StudentComponent } from './student.component';


@NgModule({
  declarations: [
    StudentComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AdminSharedModule,
  ]
})
export class StudentModule {
  constructor(){
    console.log("admin student module")
  }
 }

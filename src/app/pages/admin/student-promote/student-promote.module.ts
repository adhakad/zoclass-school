import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPromoteRoutingModule } from './student-promote-routing.module';
import { StudentPromoteComponent } from './student-promote.component';


@NgModule({
  declarations: [
    StudentPromoteComponent
  ],
  imports: [
    CommonModule,
    StudentPromoteRoutingModule
  ]
})
export class StudentPromoteModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentSubjectRoutingModule } from './student-subject-routing.module';
import { StudentSubjectComponent } from './student-subject.component';
import { StudentSharedModule } from '../student-shared/student-shared.module';

@NgModule({
  declarations: [
    StudentSubjectComponent
  ],
  imports: [
    CommonModule,
    StudentSubjectRoutingModule,

    StudentSharedModule,
  ]
})
export class StudentSubjectModule { 
  constructor(){
    console.log("student subject module load")
  }
}

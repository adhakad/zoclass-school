import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherStudentResultsRoutingModule } from './teacher-student-results-routing.module';
import { TeacherStudentResultsComponent } from './teacher-student-results.component';
import { TeacherSharedModule } from '../teacher-shared/teacher-shared.module';


@NgModule({
  declarations: [
    TeacherStudentResultsComponent
  ],
  imports: [
    CommonModule,
    TeacherStudentResultsRoutingModule,
    TeacherSharedModule
  ]
})
export class TeacherStudentResultsModule {
  constructor(){
    console.log("teacher student results module load")
  }
 }

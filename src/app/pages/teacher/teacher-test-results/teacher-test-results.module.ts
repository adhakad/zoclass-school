import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherTestResultsRoutingModule } from './teacher-test-results-routing.module';
import { TeacherTestResultsComponent } from './teacher-test-results.component';
import { TeacherSharedModule } from '../teacher-shared/teacher-shared.module';


@NgModule({
  declarations: [
    TeacherTestResultsComponent
  ],
  imports: [
    CommonModule,
    TeacherTestResultsRoutingModule,
    TeacherSharedModule
  ]
})
export class TeacherTestResultsModule { 
  constructor(){
    console.log("teacher test results module load")
  }
}

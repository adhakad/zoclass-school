import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentTestResultsRoutingModule } from './student-test-results-routing.module';
import { StudentTestResultsComponent } from './student-test-results.component';
import { StudentSharedModule } from '../student-shared/student-shared.module';

@NgModule({
  declarations: [
    StudentTestResultsComponent
  ],
  imports: [
    CommonModule,
    StudentTestResultsRoutingModule,

    StudentSharedModule,
  ]
})
export class StudentTestResultsModule {
  constructor(){
    console.log("student test results module load")
  }
 }

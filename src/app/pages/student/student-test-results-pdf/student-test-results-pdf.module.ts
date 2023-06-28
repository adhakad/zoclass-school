import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentTestResultsPdfRoutingModule } from './student-test-results-pdf-routing.module';
import { StudentTestResultsPdfComponent } from './student-test-results-pdf.component';
import { StudentSharedModule } from '../student-shared/student-shared.module';


@NgModule({
  declarations: [
    StudentTestResultsPdfComponent
  ],
  imports: [
    CommonModule,
    StudentTestResultsPdfRoutingModule,
    StudentSharedModule

  ]
})
export class StudentTestResultsPdfModule {
  constructor(){
    console.log("student test results pdf module load")
  }
 }

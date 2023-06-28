import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentTestRoutingModule } from './student-test-routing.module';
import { StudentTestComponent } from './student-test.component';
import { StudentSharedModule } from '../student-shared/student-shared.module';

@NgModule({
  declarations: [
    StudentTestComponent
  ],
  imports: [
    CommonModule,
    StudentTestRoutingModule,
    StudentSharedModule,
  ]
})
export class StudentTestModule {
  constructor(){
    console.log("student test module load")
  }
 }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherTestRoutingModule } from './teacher-test-routing.module';
import { TeacherTestComponent } from './teacher-test.component';
import { TeacherSharedModule } from '../teacher-shared/teacher-shared.module';


@NgModule({
  declarations: [
    TeacherTestComponent
  ],
  imports: [
    CommonModule,
    TeacherTestRoutingModule,
    TeacherSharedModule
  ]
})
export class TeacherTestModule { 
  constructor(){
    console.log("teacher test module load")
  }
}

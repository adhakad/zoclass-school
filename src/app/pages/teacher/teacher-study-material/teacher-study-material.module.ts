import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherStudyMaterialRoutingModule } from './teacher-study-material-routing.module';
import { TeacherStudyMaterialComponent } from './teacher-study-material.component';
import { TeacherSharedModule } from '../teacher-shared/teacher-shared.module';


@NgModule({
  declarations: [
    TeacherStudyMaterialComponent
  ],
  imports: [
    CommonModule,
    TeacherStudyMaterialRoutingModule,
    TeacherSharedModule
  ]
})
export class TeacherStudyMaterialModule {
  constructor(){
    console.log("teacher study material module load")
  }
 }

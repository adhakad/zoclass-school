import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherSubjectRoutingModule } from './teacher-subject-routing.module';
import { TeacherSubjectComponent } from './teacher-subject.component';
import { TeacherSharedModule } from '../teacher-shared/teacher-shared.module';


@NgModule({
  declarations: [
    TeacherSubjectComponent
  ],
  imports: [
    CommonModule,
    TeacherSubjectRoutingModule,
    TeacherSharedModule
  ]
})
export class TeacherSubjectModule { }

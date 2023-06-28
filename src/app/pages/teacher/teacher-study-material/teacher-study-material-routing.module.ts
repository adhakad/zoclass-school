import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherStudyMaterialComponent } from './teacher-study-material.component';

const routes: Routes = [
  { path: '', component: TeacherStudyMaterialComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherStudyMaterialRoutingModule { }

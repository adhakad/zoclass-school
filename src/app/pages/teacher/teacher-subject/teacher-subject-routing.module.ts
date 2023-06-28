import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherSubjectComponent } from './teacher-subject.component';

const routes: Routes = [
  { path: '', component:TeacherSubjectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherSubjectRoutingModule { }

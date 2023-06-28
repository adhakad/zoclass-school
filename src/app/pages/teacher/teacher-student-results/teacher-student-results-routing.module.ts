import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherStudentResultsComponent } from './teacher-student-results.component';

const routes: Routes = [
  { path: '', component: TeacherStudentResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherStudentResultsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherTestResultsComponent } from './teacher-test-results.component';

const routes: Routes = [
  { path: '', component: TeacherTestResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherTestResultsRoutingModule { }

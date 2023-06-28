import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTestResultsComponent } from './student-test-results.component';

const routes: Routes = [
  { path: '', component: StudentTestResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentTestResultsRoutingModule { }

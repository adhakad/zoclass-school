import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTestResultsPdfComponent } from './student-test-results-pdf.component';

const routes: Routes = [
  { path: '', component: StudentTestResultsPdfComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentTestResultsPdfRoutingModule { }

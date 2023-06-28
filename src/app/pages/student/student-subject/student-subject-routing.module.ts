import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentSubjectComponent } from './student-subject.component';

const routes: Routes = [
  { path: '', component: StudentSubjectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentSubjectRoutingModule { }

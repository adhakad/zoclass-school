import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentResultClsComponent } from './admin-student-result-cls.component';

const routes: Routes = [
  { path: '', component: AdminStudentResultClsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStudentResultClsRoutingModule { }

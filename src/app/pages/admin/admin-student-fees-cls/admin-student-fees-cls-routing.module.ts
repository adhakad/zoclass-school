import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentFeesClsComponent } from './admin-student-fees-cls.component';

const routes: Routes = [
  { path: '', component: AdminStudentFeesClsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStudentFeesClsRoutingModule { }

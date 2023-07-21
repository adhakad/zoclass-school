import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentAdmitCardClsComponent } from './admin-student-admit-card-cls.component';

const routes: Routes = [
  { path: '', component: AdminStudentAdmitCardClsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStudentAdmitCardClsRoutingModule { }

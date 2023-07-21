import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentAdmissionComponent } from './admin-student-admission.component';

const routes: Routes = [
  { path: '', component: AdminStudentAdmissionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStudentAdmissionRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudyMaterialComponent } from './admin-study-material.component';

const routes: Routes = [
  { path: '', component: AdminStudyMaterialComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStudyMaterialRoutingModule { }

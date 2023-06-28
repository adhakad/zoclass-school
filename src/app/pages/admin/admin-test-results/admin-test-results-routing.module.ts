import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTestResultsComponent } from './admin-test-results.component';

const routes: Routes = [
  { path: '', component: AdminTestResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTestResultsRoutingModule { }

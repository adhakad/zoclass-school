import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestResultComponent } from './test-result.component';

const routes: Routes = [
  { path: '', component: TestResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestResultRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestStartComponent } from './test-start.component';

const routes: Routes = [
  { path: '', component: TestStartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestStartRoutingModule { }

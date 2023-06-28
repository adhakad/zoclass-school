import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherTestComponent } from './teacher-test.component';

const routes: Routes = [
  { path: '', component: TeacherTestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherTestRoutingModule { }

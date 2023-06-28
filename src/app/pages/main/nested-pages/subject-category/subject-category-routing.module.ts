import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectCategoryComponent } from './subject-category.component';

const routes: Routes = [
  { path: '', component: SubjectCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectCategoryRoutingModule { }

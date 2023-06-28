import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleBlogComponent } from './single-blog.component';

const routes: Routes = [
  { path: '', component: SingleBlogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleBlogRoutingModule { }

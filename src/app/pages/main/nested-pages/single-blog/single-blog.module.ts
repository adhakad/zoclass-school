import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleBlogRoutingModule } from './single-blog-routing.module';
import { SingleBlogComponent } from './single-blog.component';
import { MainSharedModule } from '../../main-shared/main-shared.module';


@NgModule({
  declarations: [
    SingleBlogComponent
  ],
  imports: [
    CommonModule,
    SingleBlogRoutingModule,
    MainSharedModule
  ]
})
export class SingleBlogModule { 
  constructor(){
    console.log("single blog module load")
  }
}

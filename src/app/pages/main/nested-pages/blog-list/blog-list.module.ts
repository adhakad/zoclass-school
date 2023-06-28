import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogListRoutingModule } from './blog-list-routing.module';
import { MainSharedModule } from '../../main-shared/main-shared.module';
import { BlogListComponent } from './blog-list.component';


@NgModule({
  declarations: [
    BlogListComponent
  ],
  imports: [
    CommonModule,
    BlogListRoutingModule,
    MainSharedModule
  ]
})
export class BlogListModule { 
  constructor(){
    console.log("blog list module load")
  }
}

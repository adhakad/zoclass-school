import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectCategoryRoutingModule } from './subject-category-routing.module';
import { SubjectCategoryComponent } from './subject-category.component';
import { MainSharedModule } from '../../main-shared/main-shared.module';


@NgModule({
  declarations: [
    SubjectCategoryComponent
  ],
  imports: [
    CommonModule,
    SubjectCategoryRoutingModule,
    MainSharedModule
  ]
})
export class SubjectCategoryModule {
  constructor(){
    console.log("subject category module load")
  }
 }

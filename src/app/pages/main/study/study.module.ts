import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyRoutingModule } from './study-routing.module';
import { StudyComponent } from './study.component';
import { MainSharedModule } from '../main-shared/main-shared.module';


@NgModule({
  declarations: [
    StudyComponent
  ],
  imports: [
    CommonModule,
    StudyRoutingModule,
    MainSharedModule
  ]
})
export class StudyModule {
  constructor(){
    console.log("study module load")
  }
 }

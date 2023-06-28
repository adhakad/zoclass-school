import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestStartRoutingModule } from './test-start-routing.module';
import { TestStartComponent } from './test-start.component';
import { MainSharedModule } from '../../main-shared/main-shared.module';


@NgModule({
  declarations: [
    TestStartComponent
  ],
  imports: [
    CommonModule,
    TestStartRoutingModule,
    MainSharedModule
  ]
})
export class TestStartModule {
  constructor(){
    console.log("test start module load")
  }
 }

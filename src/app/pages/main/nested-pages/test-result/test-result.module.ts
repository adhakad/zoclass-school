import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestResultRoutingModule } from './test-result-routing.module';
import { TestResultComponent } from './test-result.component';
import { MainSharedModule } from '../../main-shared/main-shared.module';


@NgModule({
  declarations: [
    TestResultComponent
  ],
  imports: [
    CommonModule,
    TestResultRoutingModule,
    MainSharedModule
  ]
})
export class TestResultModule { 
  constructor(){
    console.log("test result module load")
  }
}

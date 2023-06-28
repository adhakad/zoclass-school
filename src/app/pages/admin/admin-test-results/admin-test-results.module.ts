import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTestResultsRoutingModule } from './admin-test-results-routing.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { AdminTestResultsComponent } from './admin-test-results.component';


@NgModule({
  declarations: [
    AdminTestResultsComponent
  ],
  imports: [
    CommonModule,
    AdminTestResultsRoutingModule,

    AdminSharedModule,

  ]
})
export class AdminTestResultsModule { 
  constructor(){
    console.log("admin test results module")
  }
}

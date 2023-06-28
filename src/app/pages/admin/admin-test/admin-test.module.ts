import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTestRoutingModule } from './admin-test-routing.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { AdminTestComponent } from './admin-test.component';


@NgModule({
  declarations: [
    AdminTestComponent
  ],
  imports: [
    CommonModule,
    AdminTestRoutingModule,

    AdminSharedModule,
  ]
})
export class AdminTestModule {
  constructor(){
    console.log("admin test module")
  }
 }

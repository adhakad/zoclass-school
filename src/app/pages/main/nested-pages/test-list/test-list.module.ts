import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestListRoutingModule } from './test-list-routing.module';
import { TestListComponent } from './test-list.component';
import { MainSharedModule } from '../../main-shared/main-shared.module';


@NgModule({
  declarations: [
    TestListComponent
  ],
  imports: [
    CommonModule,
    TestListRoutingModule,
    MainSharedModule
  ]
})
export class TestListModule {
  constructor(){
    console.log("test list module load")
  }
 }

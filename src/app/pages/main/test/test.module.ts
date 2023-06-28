import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { MainSharedModule } from '../main-shared/main-shared.module';
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    MainSharedModule
  ]
})
export class TestModule { 
  constructor(){
    console.log("test module load")
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStudentFeesRoutingModule } from './admin-student-fees-routing.module';
import { AdminStudentFeesComponent } from './admin-student-fees.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';

import { ChunkPipe } from 'src/app/chunk.pipe';


@NgModule({
  declarations: [
    AdminStudentFeesComponent,
    ChunkPipe
  ],
  imports: [
    CommonModule,
    AdminStudentFeesRoutingModule,
    AdminSharedModule
  ]
})
export class AdminStudentFeesModule { 
  constructor(){
    console.log("admin student fees module")
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmitCardRoutingModule } from './admit-card-routing.module';
import { AdmitCardComponent } from './admit-card.component';


@NgModule({
  declarations: [
    AdmitCardComponent
  ],
  imports: [
    CommonModule,
    AdmitCardRoutingModule
  ]
})
export class AdmitCardModule { }

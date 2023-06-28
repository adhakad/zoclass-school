import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationPagesRoutingModule } from './notification-pages-routing.module';
import { NotificationPagesComponent } from './notification-pages.component';


@NgModule({
  declarations: [
    NotificationPagesComponent
  ],
  imports: [
    CommonModule,
    NotificationPagesRoutingModule
  ]
})
export class NotificationPagesModule { 
  constructor(){
    console.log("teacher notification module load")
  }
}

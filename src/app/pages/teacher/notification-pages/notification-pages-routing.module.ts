import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationPagesComponent } from './notification-pages.component';

const routes: Routes = [
  { path: '', component: NotificationPagesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationPagesRoutingModule { }

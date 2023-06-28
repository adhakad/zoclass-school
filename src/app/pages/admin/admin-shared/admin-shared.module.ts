import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavbarModule } from '../common/side-navbar/side-navbar.module';
import { HeaderNavbarModule } from '../common/header-navbar/header-navbar.module';
import { MaterialUiModule } from 'src/app/material/material-ui/material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '../../pagination/pagination.module';
import { PortalModule } from '@angular/cdk/portal';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    SideNavbarModule,
    HeaderNavbarModule,
    MaterialUiModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule,
    PortalModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    NgxMatFileInputModule
  ]
})
export class AdminSharedModule { }

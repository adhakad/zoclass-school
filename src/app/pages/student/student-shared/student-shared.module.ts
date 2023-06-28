import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationModule } from '../common/side-navigation/side-navigation.module';
import { HeaderNavigationModule } from '../common/header-navigation/header-navigation.module';
import { MaterialUiModule } from 'src/app/material/material-ui/material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '../../pagination/pagination.module';
import { PortalModule } from '@angular/cdk/portal';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { RoundProgressModule } from 'angular-svg-round-progressbar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderNavigationModule,
    SideNavigationModule,

    MaterialUiModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule,
    PortalModule,
    RoundProgressModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    NgxMatFileInputModule
  ]
})
export class StudentSharedModule { }

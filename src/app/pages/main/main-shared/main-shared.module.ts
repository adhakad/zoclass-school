import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from 'src/app/common/header/header.module';
import { NavbarModule } from 'src/app/common/navbar/navbar.module';
import { MaterialUiModule } from 'src/app/material/material-ui/material-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from '../../pagination/pagination.module';
import { PortalModule } from '@angular/cdk/portal';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    HeaderModule,
    NavbarModule,
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
export class MainSharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MaterialModule } from 'src/app/shared/material.module';
import { FlightComponent } from './flight/flight.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    FlightComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class StaffModule { }

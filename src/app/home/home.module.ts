import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AppMaterialModule } from '../app-material.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ProfileComponent } from './components/employee-profile/employee-profile.component';
import { NgxsModule } from '@ngxs/store';
import { HomeState } from './store/home.state';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';


@NgModule({
  declarations: [HomeComponent, EmployeeListComponent, ProfileComponent, ProfileCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxsModule.forFeature([HomeState]),
    AppMaterialModule
  ]
})
export class HomeModule { }

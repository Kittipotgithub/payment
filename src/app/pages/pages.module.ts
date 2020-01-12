import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';

import { SharedModule } from '@shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule, MatAutocompleteModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from 'app/app-routing.module';


@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    NgxPaginationModule,
    MatAutocompleteModule
  ]
})
export class PagesModule {}

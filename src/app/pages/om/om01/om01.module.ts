import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule, MatAutocompleteModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

import { Om01RoutingModule } from './om01-routing.module';
import { Om01Component } from './om01.component';
import { Om011Component } from './om011/om011.component';
import { Om012Component } from './om012/om012.component';
// shared
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [Om01Component, Om011Component, Om012Component],
  imports: [
    SharedModule,
    CommonModule,
    Om01RoutingModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatAutocompleteModule
  ]
})
export class Om01Module {}

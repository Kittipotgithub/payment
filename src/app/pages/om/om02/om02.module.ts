import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatNativeDateModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

import { Om02RoutingModule } from './om02-routing.module';
import { Om02Component } from './om02.component';
import { Om021Component } from './om021/om021.component';
import { Om022Component } from './om022/om022.component';

// shared
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [Om02Component, Om021Component, Om022Component],
  imports: [
    SharedModule,
    CommonModule,
    Om02RoutingModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class Om02Module {}

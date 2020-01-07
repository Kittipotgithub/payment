import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpreadsheetRoutingModule } from './spreadsheet-routing.module';
import { SpreadsheetComponent } from './spreadsheet.component';

// shared
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [SpreadsheetComponent],
  imports: [
    SharedModule,
    CommonModule,
    SpreadsheetRoutingModule
  ]
})
export class SpreadsheetModule {}

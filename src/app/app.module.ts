import { CurrencyPipe } from './shared/pipe/currency.pipe';
import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule , MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
// material angular
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { PagesModule } from '@pages/pages.module';
import { HeaderComponent } from '@shared/component/header/header.component';
import { SidebarComponent } from '@shared/component/sidebar/sidebar.component';
import { Constant } from '@shared/constant';
import { GlobalObject } from '@shared/global-object';
import { SharedModule } from '@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Utils } from './shared/utils';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    PagesModule,
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    NgxPaginationModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  exports: [NgxPaginationModule],
  providers: [GlobalObject, Constant, FormBuilder, Utils,CurrencyPipe, 
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000, verticalPosition: 'top'} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

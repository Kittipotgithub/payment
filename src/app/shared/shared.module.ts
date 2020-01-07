import { NgxPaginationModule } from 'ngx-pagination';
import { HeadContentComponent } from './component/head-content/head-content.component';
import { LoadingComponent } from './component/loading/loading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './component/footer/footer.component';
import { DialogSaveComponent } from './component/dialog-save/dialog-save.component';
import { DialogSearchComponent } from './component/dialog-search/dialog-search.component';
import { DialogReverseComponent } from './component/dialog-reverse/dialog-reverse.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { CurrencyPipe } from './pipe/currency.pipe';
import { CurrencyDirective } from './directives/currency.directive';
import { DialogPaymentAdvanceComponent } from './component/dialog-payment-advance/dialog-payment-advance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThaidatePipe } from './pipe/thaidate.pipe';
import { DialogExportXmlComponent } from './component/dialog-export-xml/dialog-export-xml.component';
import { MatTabsModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { DatepickerHeaderComponent } from './component/datepicker-header/datepicker-header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThaiyearPipe } from './pipe/thaiyear.pipe';
import { EnglishOnlyDirective } from './directives/english-only.directive';
import { ThaiOnlyDirective } from './directives/thai-only.directive';
import { XmlPipe } from './pipe/xml.pipe';
import { JsonPipe } from './pipe/json.pipe';
import { DialogExportJsonComponent } from './component/dialog-export-json/dialog-export-json.component';

import { UpperCaseDirectiveDirective } from './directives/upper-case-directive.directive';
import { DialogUserGuideComponent } from './component/dialog-user-guide/dialog-user-guide.component';
import { PostingKeyPipe } from './pipe/posting-key.pipe';


@NgModule({
  declarations: [
    HeadContentComponent,
    FooterComponent,
    LoadingComponent,

    NumberOnlyDirective,
    CurrencyDirective,
    CurrencyPipe,
    ThaidatePipe,
    ThaiyearPipe,
    PostingKeyPipe,

    DialogSaveComponent,
  
    DialogSearchComponent,
  

    DialogReverseComponent,

    DialogExportXmlComponent,

    DialogPaymentAdvanceComponent,
    
    DatepickerHeaderComponent,

    EnglishOnlyDirective,
    ThaiOnlyDirective,
   
    XmlPipe,
    JsonPipe,
    DialogExportJsonComponent,

    UpperCaseDirectiveDirective,

    DialogUserGuideComponent,

   
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DragDropModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxPaginationModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  exports: [
    HttpClientModule,
    HeadContentComponent,
    FooterComponent,
    LoadingComponent,
    NumberOnlyDirective,
    CurrencyDirective,
    ThaidatePipe,
    ThaiyearPipe,
    EnglishOnlyDirective,
    ThaiOnlyDirective,
    UpperCaseDirectiveDirective,
    JsonPipe,
    XmlPipe,
    PostingKeyPipe,
  ],
})
export class SharedModule {}

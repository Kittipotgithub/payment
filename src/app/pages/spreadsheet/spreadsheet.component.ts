import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Constant } from '@shared/constant';
import { GlobalObject } from '@shared/global-object';
import { SidebarService } from '@core/services/sidebar.service';
@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.scss']
})
export class SpreadsheetComponent implements OnInit, AfterViewInit {

  typeForm = '';
  
  constructor(
    private globalObject: GlobalObject,
    public constant: Constant,
    private sidebarService: SidebarService) {
    this.constant = this.constant;
  }

  ngAfterViewInit(): void { }

  ngOnInit() {
    this.sidebarService.updatePageType('menu');
    this.sidebarService.updateNowPage('menu');
    this.typeForm = 'PO';
  }

  select(value) {
    this.typeForm = value;
  }
}

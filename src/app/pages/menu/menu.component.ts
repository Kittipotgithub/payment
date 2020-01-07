import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Constant } from '@shared/constant';
import { GlobalObject } from '@shared/global-object';
import { SidebarService } from '@core/services/sidebar.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
    constructor(private globalObject: GlobalObject, public constant: Constant, private sidebarService: SidebarService) {
    this.constant = this.constant;
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.globalObject.menuPage = 'menu';
    //   this.globalObject.nowpage = 'menu';
    // }, 100);
    // this.globalObject.isShowMenu = true;
  }

  ngOnInit() {
    this.sidebarService.updatePageType('menu');
    this.sidebarService.updateNowPage('menu');
  }
}

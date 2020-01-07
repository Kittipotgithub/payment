import { Component, OnInit } from '@angular/core';
import { Constant } from '@shared/constant';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-om02',
  templateUrl: './om02.component.html',
  styleUrls: ['./om02.component.scss']
})
export class Om02Component implements OnInit {
  topic = 'อนุมัติเอกสารเพื่อสั่งจ่าย (อม. 02)';
  description = 'สร้างอนุมัติเอกสารเพื่อสั่งจ่าย';

  constructor(public constant: Constant, private router: Router, private sidebarService: SidebarService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((value: any) => {
      // tslint:disable-next-line: no-string-literal
      const urlName = value['url'];
      if (urlName.indexOf('om021') > 0) {
        this.description = 'สร้างอนุมัติเอกสารเพื่อสั่งจ่าย';
      } else if (urlName.indexOf('om022')  > 0) {
        this.description = 'ค้นหาอนุมัติเอกสารเพื่อสั่งจ่าย';
      }
    });
  }

  ngOnInit() {
    this.sidebarService.updatePageType('kb');
    this.sidebarService.updateNowPage('om02');
  }
}

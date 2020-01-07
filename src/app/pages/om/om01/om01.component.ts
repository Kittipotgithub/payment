import { Component, OnInit } from '@angular/core';
import { Constant } from '@shared/constant';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-om01',
  templateUrl: './om01.component.html',
  styleUrls: ['./om01.component.scss']
})
export class Om01Component implements OnInit {
  topic = 'อนุมัติเอกสารขอเบิก (อม.01)';
  description = 'สร้างอนุมัติเอกสารขอเบิก';

  constructor(public constant: Constant, private router: Router, private sidebarService: SidebarService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((value: any) => {
      // tslint:disable-next-line: no-string-literal
      const urlName = value['url'];
      if (urlName.indexOf('om011') > 0) {
        this.description = 'สร้างอนุมัติเอกสารขอเบิก';
      } else if (urlName.indexOf('om012')  > 0) {
        this.description = 'ค้นหาอนุมัติเอกสารขอเบิก';
      }
    });
  }

  ngOnInit() {
    this.sidebarService.updatePageType('kb');
    this.sidebarService.updateNowPage('om01');
  }
}

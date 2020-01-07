import { UserProfile } from '@core/models/user-profile';
import { LocalStorageService } from '@core/services/local-storage.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { GlobalObject } from '@shared/global-object';
import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SidebarService } from '@core/services/sidebar.service';
import { DialogUserGuideComponent } from '@shared/component/dialog-user-guide/dialog-user-guide.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  isLogin = false;
  wherepage;
  global: GlobalObject;
  userProfile: UserProfile;
  listSidebar = [];
  headmenu = 'เลือกรายการที่ต้องการ';

  isSidebarVisible = true;
  menuClassMobile = ""
  pageType = '';
  pageName = '';
  activeIndex = 0;
  // maxIndexMenu = 13; // set max index menu
  maxIndexMenu = 5; // set max index menu
  constructor(
    private router: Router,
    private globalObject: GlobalObject,
    private localStorageService: LocalStorageService,
    private sidebarService: SidebarService,
    private dialog: MatDialog,
  ) {
    this.global = this.globalObject;
  }
  ngOnInit() {
    this.userProfile = this.localStorageService.getUserProfile();
    // if (this.userProfile === null && this.userProfile === undefined) {
    //   this.router.navigate(['/']);
    // }

    this.sidebarService.sidebarVisibilityChange.subscribe(value => {
      this.isSidebarVisible = this.sidebarService.isSidebarVisible;
    });

    this.sidebarService.sidebarUserProfileChange.subscribe(value => {
      this.userProfile = this.sidebarService.userProfile;
    });

    this.sidebarService.sidebarNowPageChange.subscribe(value => {
      this.pageName = this.sidebarService.nowPage;
      this.pageType = this.sidebarService.pageType;
      this.setMenu();
    });

    this.sidebarService.sidebarToggleChange.subscribe(value => {
     console.log(value)
      this.menuClassMobile = (value) ? "opened" : ""
    });

    this.wherepage = this.globalObject.nowpage;
  }

  userGuide() {
    const dialogRef = this.dialog.open(DialogUserGuideComponent, {
      width: '60vw',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  logout() {
    this.userProfile = null;
    sessionStorage.removeItem('userProfile');
    this.router.navigate(['/']);
  }

  setMenu() {
    this.activeIndex = 0;
    this.mapMenu(this.pageType);
  }

  changeActiveMenu() {
    if (this.activeIndex >= this.maxIndexMenu) {
      this.activeIndex = 0;
    } else {
      this.activeIndex += 1;
    }
    this.mapMenuWithActiveIndex(this.activeIndex);
  }

  // mapMenuWithActiveIndex(activeIndex) {
  //   this.headmenu = '';
  //   this.listSidebar = [];
  //   if (activeIndex === 0) {
  //     this.mapMenu('sng');
  //   } else if (activeIndex === 1) {
  //     this.mapMenu('pk');
  //   } else if (activeIndex === 2) {
  //     this.mapMenu('os');
  //   } else if (activeIndex === 3) {
  //     this.mapMenu('kj');
  //   } else if (activeIndex === 4) {
  //     this.mapMenu('kb1');
  //   } else if (activeIndex === 5) {
  //     this.mapMenu('kb2');
  //   } else if (activeIndex === 6) {
  //     this.mapMenu('kb3');
  //   } else if (activeIndex === 7) {
  //     this.mapMenu('ns1');
  //   } else if (activeIndex === 8) {
  //     this.mapMenu('bc21');
  //   } else if (activeIndex === 9) {
  //     this.mapMenu('bc1');
  //   } else if (activeIndex === 10) {
  //     this.mapMenu('bc2');
  //   } else if (activeIndex === 11) {
  //     this.mapMenu('bc3');
  //   } else if (activeIndex === 12) {
  //     this.mapMenu('st1');
  //   } else if (activeIndex === 13) {
  //     this.mapMenu('st2');
  //   }
  // }

  // mapMenu(type) {
  //   this.headmenu = '';
  //   this.listSidebar = [];
  //   switch (type) {
  //     case 'menu':
  //       this.headmenu = 'เลือกรายการที่ต้องการ';
  //       this.listSidebar.push({ link: '/', name: 'บันทึกรายการ', detail: 'สร้าง/บันทึก/ค้นหา/เปลี่ยนแปลงเอกสาร', active: false });
  //       this.listSidebar.push({ link: '/', name: 'รายงาน', detail: 'เรียกรายงาน Online', active: false });
  //       this.listSidebar.push({ link: '/', name: 'รายงาน', detail: 'เรียกรายงาน Web Report', active: false });
  //       this.listSidebar.push({ link: '/', name: 'ขอรับแบบฟอร์ม', detail: 'Spreadsheet Template', active: false });
  //       break;
  //     case 'sng':
  //       this.headmenu = 'ระบบการบริหารงบประมาณ';
  //       this.listSidebar.push({ link: '/sng01', name: 'สง01', detail: 'เอกสารสำรองเงิน-เงินปีปัจจุบัน', active: this.pageName === 'sng01' ? true : false });
  //       this.listSidebar.push({
  //         link: '/sng02',
  //         name: 'สง02',
  //         detail: 'รายการเอกสารสำรองเงินที่ขอกันเงินไว้เบิกเหลื่อมปี/ขยายเวลาเบิกจ่าย (List) (สง.02)',
  //         active: this.pageName === 'sng02' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/sng03',
  //         name: 'สง03',
  //         detail: 'การยกเลิกเอกสารสำรองเงินที่ขอกันเงินไว้เบิกเหลื่อมปี/ขยายเวลาเบิกจ่าย (List Cancel) (สง.03)',
  //         active: this.pageName === 'sng03' ? true : false
  //       });
  //       // this.listSidebar.push({ link: '/sng04', name: 'สง04', detail: 'ลดยอดสำรองเงิน', active: this.pageName === 'sng04' ? true : false });
  //       this.listSidebar.push({
  //         link: '/op01',
  //         name: 'อพ01',
  //         detail: 'อนุมัติการขอกันเงินไว้เบิกเหลื่อมปี/ขยายเวลาเบิกจ่าย (Confirm)(อพ.01)',
  //         active: this.pageName === 'op01' ? true : false
  //       });
  //       break;
  //     case 'pk':
  //       this.headmenu = 'ระบบจัดซื้อจัดจ้าง';
  //       this.listSidebar.push({ link: '/br01', name: 'บร01', detail: 'รับพัสดุ', active: this.pageName === 'br01' ? true : false });
  //       this.listSidebar.push({
  //         link: '/bs01',
  //         name: 'บส01',
  //         detail: 'สั่งซื้อ/จ้าง/เช่า',
  //         active: this.pageName === 'bs01' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bs04',
  //         name: 'บส04',
  //         detail: 'สั่งซื้อ/จ้าง/เช่า ประเภทการส่งมอบไม่แน่นอน',
  //         active: this.pageName === 'bs04' ? true : false
  //       });
  //       this.listSidebar.push({ link: '/pk01', name: 'ผข01', detail: 'ข้อมูลหลักผู้ขาย', active: this.pageName === 'pk01' ? true : false });
  //       this.listSidebar.push({
  //         link: '/os01',
  //         name: 'อส01',
  //         detail: 'แสดงรายการ PO ขอขยายเบิกจ่าย-กันเหลื่อมปี (List)',
  //         active: this.pageName === 'os01' ? true : false
  //       });
  //       break;
  //     case 'os':
  //       this.headmenu = 'เลือกรายการที่ต้องการ';
  //       this.listSidebar.push({
  //         link: '/os02',
  //         name: 'อส02',
  //         detail: 'ยกเลิกรายการ PO ขอขยายเบิกจ่าย-กันเหลื่อมปี (List Cancel)',
  //         active: this.pageName === 'os02' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/os03',
  //         name: 'อส03',
  //         detail: 'อนุมัติรายการใบสั่งซ้อจ้าง ขยายเบิกจ่ายกันเหลื่อมปี (Confirm)',
  //         active: this.pageName === 'os03' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/os04',
  //         name: 'อส04',
  //         detail: 'เลือก PO จ้างเหมา-ไม่ใช่บุคคลธรรมดา < 100,000',
  //         active: this.pageName === 'os04' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/os05',
  //         name: 'อส05',
  //         detail: 'ยกเลิกเลือก PO จ้างเหมา-ไม่ใช่บุคคลธรรมดา < 100,000',
  //         active: this.pageName === 'os05' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/sl01',
  //         name: 'สล01',
  //         detail: 'สลาย PO สร้างเอกสารสำรองเงิน PF',
  //         active: this.pageName === 'sl01' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/sl02',
  //         name: 'สล02',
  //         detail: 'สลาย PO สร้างเอกสารสำรองเงิน PF',
  //         active: this.pageName === 'sl02' ? true : false
  //       });
  //       break;
  //     case 'kj':
  //       this.headmenu = 'เลือกรายการที่ต้องการ';
  //       this.listSidebar.push({
  //         link: '/kj05',
  //         name: 'ขจ05',
  //         detail: 'บันทึกรายการจ่ายชำระเงิน',
  //         active: this.pageName === 'kj05' ? true : false
  //       });
  //       break;
  //     case 'kb1':
  //       this.headmenu = 'ระบบเบิกจ่าย';
  //       this.listSidebar.push({
  //         link: '/kb01',
  //         name: 'ขบ01',
  //         detail: 'ขอเบิกเงินงบประมาณที่ต้องอ้างใบสั่งซื้อฯ',
  //         active: this.pageName === 'kb01' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/kb02',
  //         name: 'ขบ02',
  //         detail: 'ขอเบิกเงินงบประมาณที่ไม่อ้างใบสั่งซื้อฯ',
  //         active: this.pageName === 'kb02' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/kb03',
  //         name: 'ขบ03',
  //         detail: 'ขอเบิกเงินนอกงบประมาณที่ไม่อ้างใบสั่งซื้อฯ',
  //         active: this.pageName === 'kb03' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/kb05',
  //         name: 'ขบ05',
  //         detail: 'ขอถอนคืนรายได้แผ่นดิน',
  //         active: this.pageName === 'kb05' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/kb06',
  //         name: 'ขบ06',
  //         detail: 'ขอถอนคืนรายได้เงินนอกงบประมาณ',
  //         active: this.pageName === 'kb06' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/kb08',
  //         name: 'ขบ08',
  //         detail: 'ขอเบิกเงินรายได้จัดสรร',
  //         active: this.pageName === 'kb08' ? true : false
  //       });
  //       break;
  //     case 'kb2':
  //       this.headmenu = 'ระบบเบิกจ่าย';
  //       this.listSidebar.push({
  //         link: '/kb09',
  //         name: 'ขบ09',
  //         detail: 'ขอถอนคืนรายได้แผ่นดินผ่านระบบ BAHTNET',
  //         active: this.pageName === 'kb09' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/kb10',
  //         name: 'ขบ10',
  //         detail: 'ขอถอนเงินจัดสรรให้ อปท. ผ่านระบบ BAHTNET',
  //         active: this.pageName === 'kb10' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/kb11',
  //         name: 'ขบ11',
  //         detail: 'ขอเบิกเงินงบประมาณที่ต้องอ้างใบสั่งซื้อฯ การส่งมอบไม่แน่นอน',
  //         active: this.pageName === 'kb11' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/tk01',
  //         name: 'ทข01',
  //         detail: 'ขอเบิกเงินกู้อ้างอิงใบสั่งซื้อฯ',
  //         active: this.pageName === 'tk01' ? true : false
  //       });
  //       break;
  //     case 'kb3':
  //       this.headmenu = 'ระบบเบิกจ่าย';
  //       this.listSidebar.push({
  //         link: '/tk02',
  //         name: 'ทข02',
  //         detail: 'ขอเบิกเงินกู้ที่ไม่อ้างอิงใบสั่งซื้อฯ',
  //         active: this.pageName === 'tk02' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/tk11',
  //         name: 'ทข11',
  //         detail: 'ขอเบิกเงินกู้อ้างอิงใบสั่งซื้อฯ การส่งมอบไม่แน่นอน',
  //         active: this.pageName === 'tk11' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/kj05',
  //         name: 'ขจ05',
  //         detail: 'บันทึกรายการจ่ายชำระเงิน',
  //         active: this.pageName === 'kj05' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bc01',
  //         name: 'บช01',
  //         detail: 'บันทึกรายการบัญชีแยกประเภท',
  //         active: this.pageName === 'bc01' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/ns021a',
  //         name: 'นส02-1',
  //         detail: 'นำส่งเงินแบบผ่านรายการ',
  //         active: this.pageName === 'ns01a' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/ns022a',
  //         name: 'นส02-2',
  //         detail: 'นำส่งเงินแบบพักรายการ',
  //         active: this.pageName === 'ns02a' ? true : false
  //       });
  //       break;
  //     case 'ns1':
  //       this.headmenu = 'ระบบนำส่ง';
  //       this.listSidebar.push({
  //         link: '/ns01',
  //         name: 'นส01',
  //         detail: 'การรับเงินของหน่วยงาน',
  //         active: this.pageName === 'ns01' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/ns021',
  //         name: 'นส02-1',
  //         detail: 'นำส่งเงินแบบผ่านรายการ',
  //         active: this.pageName === 'ns021' ? true : false
  //       });
  //       this.listSidebar.push({ link: '/ns03', name: 'นส03', detail: 'การรับเงินแทนกัน', active: this.pageName === 'ns03' ? true : false });
  //       this.listSidebar.push({
  //         link: '/ns022',
  //         name: 'นส02-2',
  //         detail: 'นำส่งเงินแบบพักรายการ',
  //         active: this.pageName === 'ns022' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/om03',
  //         name: 'อม03',
  //         detail: 'อนุมัติเอกสารนำส่ง',
  //         active: this.pageName === 'om03' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bc20',
  //         name: 'บช20',
  //         detail: 'บันทึกรายการตั้งลูกหนี้เช็คขัดข้อง',
  //         active: this.pageName === 'bc20' ? true : false
  //       });
  //       break;
  //     case 'bc21':
  //       this.headmenu = 'ระบบบัญชีแยกประเภท';
  //       this.listSidebar.push({
  //         link: '/bc21',
  //         name: 'บช21',
  //         detail: 'บันทึกรายการลดลูกหนี้เช็คขัดข้อง',
  //         active: this.pageName === 'bc21' ? true : false
  //       });
  //       break;
  //     case 'bc1':
  //       this.headmenu = 'ระบบบัญชีแยกประเภท';
  //       this.listSidebar.push({
  //         link: '/bc01',
  //         name: 'บช01',
  //         detail: 'บันทึกรายการบัญชีแยกประเภท',
  //         active: this.pageName === 'bc01' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bc01s',
  //         name: 'บช01-2',
  //         detail: 'บันทึกรายการบัญชีแยกประเภท',
  //         active: this.pageName === 'bc01s' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bc02',
  //         name: 'บช02',
  //         detail: 'บันทึกรายการปรับปรุงบัญชีค้างรับ-ค้างจ่าย',
  //         active: this.pageName === 'bc02' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bc04',
  //         name: 'บช04',
  //         detail: 'บันทึกรายการบัญชี สำหรับเอกสารที่พักไว้',
  //         active: this.pageName === 'bc04' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bc05',
  //         name: 'บช05',
  //         detail: 'งบทดลอง - หน่วยงานอิสระและองค์กรมหาชน',
  //         active: this.pageName === 'bc05' ? true : false
  //       });
  //       break;
  //     case 'bc2':
  //       this.headmenu = 'ระบบบัญชีแยกประเภท';
  //       this.listSidebar.push({
  //         link: '/bc08',
  //         name: 'บช08',
  //         detail: 'งบทดลอง - หน่วยงานต่างประเทศ',
  //         active: this.pageName === 'bc08' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bc10',
  //         name: 'บช10',
  //         detail: 'งบทดลอง - โรงพยาบาลสังกัด สป.สธ. ที่เป็นหน่วยเบิกจ่าย',
  //         active: this.pageName === 'bc10' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bc11',
  //         name: 'บช11',
  //         detail: 'งบทดลอง - เงินนอกงบประมาณของส่วนราชการ',
  //         active: this.pageName === 'bc11' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bc12',
  //         name: 'บช12',
  //         detail: 'บันทึกรายการจ่ายย้ายเงินคงคลัง',
  //         active: this.pageName === 'bc12' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/bc13',
  //         name: 'บช13',
  //         detail: 'บันทึกรายการรับย้ายเงินคงคลัง',
  //         active: this.pageName === 'bc13' ? true : false
  //       });
  //       break;
  //     case 'st1':
  //       this.headmenu = 'ระบบบัญชีสินทรัพย์ถาวร';
  //       this.listSidebar.push({ link: '/st01', name: 'สท01', detail: 'สินทรัพย์', active: this.pageName === 'st01' ? true : false });
  //       this.listSidebar.push({ link: '/st11', name: 'สท11', detail: 'สินทรัพย์ย่อย', active: this.pageName === 'st11' ? true : false });
  //       this.listSidebar.push({
  //         link: '/st12',
  //         name: 'สท12',
  //         detail: 'รายงานสินทรัพย์รายตัว',
  //         active: this.pageName === 'st12' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/st13',
  //         name: 'สท13',
  //         detail: 'ผ่านรายการด้วยการหักล้าง',
  //         active: this.pageName === 'st13' ? true : false
  //       });
  //       this.listSidebar.push({ link: '/st14', name: 'สท14', detail: 'การกำหนดกฎกระจาย', active: this.pageName === 'st14' ? true : false });
  //       this.listSidebar.push({
  //         link: '/st15',
  //         name: 'สท15',
  //         detail: 'การชำระบัญชีสินทรัพย์ระหว่างก่อสร้าง',
  //         active: this.pageName === 'st15' ? true : false
  //       });
  //       break;
  //     case 'st2':
  //       this.headmenu = 'ระบบบัญชีสินทรัพย์ถาวร';
  //       this.listSidebar.push({
  //         link: '/st16',
  //         name: 'สท16',
  //         detail: 'การบันทึกรับสินทรัพย์บริจาค',
  //         active: this.pageName === 'st16' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/st17',
  //         name: 'สท17',
  //         detail: 'การโอนภายในหน่วยเบิกจ่าย',
  //         active: this.pageName === 'st17' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/st18',
  //         name: 'สท18',
  //         detail: 'การตัดจำหน่ายสินทรัพย์',
  //         active: this.pageName === 'st18' ? true : false
  //       });
  //       this.listSidebar.push({ link: '/st19', name: 'สท19', detail: 'เอกสารสินทรัพย์ ', active: this.pageName === 'st19' ? true : false });
  //       this.listSidebar.push({
  //         link: '/st20',
  //         name: 'สท20',
  //         detail: 'การชำระบัญชีของ AuC',
  //         active: this.pageName === 'st20' ? true : false
  //       });
  //       this.listSidebar.push({
  //         link: '/st21',
  //         name: 'สท21',
  //         detail: 'รายการหักล้างใหม่',
  //         active: this.pageName === 'st21' ? true : false
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // }

  mapMenuWithActiveIndex(activeIndex) {
    this.headmenu = '';
    this.listSidebar = [];
    if (activeIndex === 0) {
      this.mapMenu('sng');
    } else if (activeIndex === 1) {
      this.mapMenu('pk');
    } else if (activeIndex === 2) {
      this.mapMenu('kb');
    } else if (activeIndex === 3) {
      this.mapMenu('ns');
    } else if (activeIndex === 4) {
      this.mapMenu('bc');
    } else if (activeIndex === 5) {
      this.mapMenu('st');
    } 
  }

  mapMenu(type) {
    this.headmenu = '';
    this.listSidebar = [];
    switch (type) {
      case 'menu':
        this.headmenu = 'เลือกรายการที่ต้องการ';
        this.listSidebar.push({ link: '/', name: 'บันทึกรายการ', detail: 'สร้าง/บันทึก/ค้นหา/เปลี่ยนแปลงเอกสาร', active: false });
        this.listSidebar.push({ link: '/', name: 'รายงาน', detail: 'เรียกรายงาน Online', active: false });
        this.listSidebar.push({ link: '/', name: 'รายงาน', detail: 'เรียกรายงาน Web Report', active: false });
        this.listSidebar.push({ link: '/spreadsheet', name: 'ขอรับแบบฟอร์ม', detail: 'Spreadsheet Template', active: false });
        break;
  

      case 'kb':
        this.headmenu = 'ระบบเบิกจ่าย';
       
         this.listSidebar.push({
          link: '/om01',
          name: 'อม01',
          detail: 'อนุมัติเอกสารขอเบิก',
          active: this.pageName === 'om01' ? true : false
        });
        this.listSidebar.push({
          link: '/om02',
          name: 'อม02',
          detail: 'อนุมัติเอกสารเพื่อสั่งจ่าย',
          active: this.pageName === 'om02' ? true : false
        });
        break;
  
      
    
      default:
        break;
    }
  }
}

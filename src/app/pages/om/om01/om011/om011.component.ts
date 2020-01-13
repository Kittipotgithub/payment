import { DialogDetailDocumentComponent } from './../../../../shared/component/dialog-detail-document/dialog-detail-document.component';
import { PaymentService } from './../../../../core/services/payment/payment.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, RouterEvent, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/format-datepicker';
import { Constant } from '@shared/constant';
import { Utils } from '@shared/utils';
import { DialogSaveOmComponent } from '@shared/component/dialog-save-om/dialog-save-om.component';
import { GlobalObject } from '@shared/global-object';
import { DatepickerHeaderComponent } from '@shared/component/datepicker-header/datepicker-header.component'

import { LocalStorageService } from '@core/services';
import { WebInfo } from '@core/models/web-info';
import { FiService } from '@core/services/fi/fi.service';
import { UserProfile } from '@core/models/user-profile';
import { LoadingScreenService } from '@core/services/loading-screen/loading-screen.service';

import { map, startWith } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { DialogSearchComponent } from '@shared/component/dialog-search/dialog-search.component';
@Component({
  selector: 'app-om011',
  templateUrl: './om011.component.html',
  styleUrls: ['./om011.component.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
})
export class Om011Component implements OnInit, AfterViewInit {
  @ViewChildren('reasonInput') reasonInput: QueryList<ElementRef>;
  @ViewChild('tabRef', { static: true }) tabRef: MatTabGroup;


  om011FormCreate: FormGroup;
  departmentCodeFromControl: FormControl; // รหัสหน่วยงาน
  departmentCodeToControl: FormControl; // รหัสหน่วยงาน
  provinceCodeFromControl: FormControl; // รหัสจังหวัด
  provinceCodeToControl: FormControl; // รหัสจังหวัด
  yearAccountControl: FormControl; // ปีบัญชี
  postDateFromControl: FormControl; // วันผ่านรายการ
  postDateToControl: FormControl; // วันผ่านรายการ
  vendorTaxIdFromControl: FormControl; // ผุ้ขาย
  vendorTaxIdToControl: FormControl; // ผุ้ขาย
  disbursementCodeFromControl: FormControl; // รหัสหน่วยเบิกจ่าย
  disbursementCodeToControl: FormControl; // รหัสหน่วยเบิกจ่าย

  docTypeFromControl: FormControl; // ประเภทเอกสาร
  docTypeToControl: FormControl; // ประเภทเอกสาร
  payMethodFromControl: FormControl; // วิธีชำระเงิน
  payMethodToControl: FormControl; // วิธีชำระเงิน
  documentDateFromControl: FormControl; // วันที่เอกสาร
  documentDateToControl: FormControl; // วันที่เอกสาร
  documentCreateDateFromControl: FormControl; // วันที่บันทึก
  documentCreateDateToControl: FormControl; // วันที่บันทึก
  specialTypeFromControl: FormControl; // แยกประเภทพิเศษ
  specialTypeToControl: FormControl; // แยกประเภทพิเศษ

  outlineControl: FormControl; // โครงร่าง

  departmentCodeFromBindingName = '' // รหัสหน่วยงาน
  departmentCodeToBindingName = '' // รหัสหน่วยงาน
  provinceCodeFromBindingName = '' // รหัสจังหวัด
  provinceCodeToBindingName = '' // รหัสจังหวัด
  vendorTaxIdFromBindingName = '' // ผุ้ขาย
  vendorTaxIdToBindingName = '' // ผุ้ขาย
  disbursementCodeFromBindingName = '' // รหัสหน่วยเบิกจ่าย
  disbursementCodeToBindingName = '' // รหัสหน่วยเบิกจ่าย


  listValidate = [];
  listMessageResponse = [];
  listDocument: any = [];
  tabAmount: number;
  selectedTabIndex: number = 0;
  p: number = 1;
  perPage: number = 5;
  isBoxNotApproveShow: boolean = true;
  isDataSearchloaded: boolean = false; // for check have data from search
  private payloadSearch;
  private typeSearch;
  sortBy = 'เลขที่เอกสาร'; // not sure api order by
  orderBy = 'ASC'; // 1=ASC 0=DESC
  webInfo: WebInfo;
  userProfile: UserProfile;
  public datePickerHeader = DatepickerHeaderComponent;

  isOpenCollapseDetail = true
  // options: string[] = ['120050000100', '120050000200', '120050000300'];
  filteredOptions: Observable<string[]>;
  constructor(
    public constant: Constant,
    private formBuilder: FormBuilder,
    private utils: Utils,
    private localStorageService: LocalStorageService,
    private fiService: FiService,
    private globalObject: GlobalObject,
    private dialog: MatDialog,
    private router: Router,
    private loadingScreenService: LoadingScreenService,
    private paymentService: PaymentService,
  ) { this.loadingScreenService.loadingToggleStatus(true) }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      // this.newDocument();
    });
    // this.userProfile = this.localStorageService.getUserProfile();
    // this.webInfo = this.localStorageService.getWebInfo();
    this.createFormControl();
    this.createFormGroup();
    this.constant.LIST_YEAR = this.utils.CalculateYear();
    this.loadingScreenService.loadingToggleStatus(false)

    this.filteredOptions = this.docTypeFromControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): any {
    const filterValue = value.toLowerCase();
    return this.constant.LIST_DOC_TYPE_OM.filter(test => test.name.toLocaleLowerCase().includes(filterValue))
  }
  ngAfterViewInit(): void {
    // this.tabAmount = this.tabRef._tabs.length;
  }

  createFormControl() {
    this.departmentCodeFromControl = this.formBuilder.control(''); // รหัสหน่วยงาน
    this.departmentCodeToControl = this.formBuilder.control(''); // รหัสหน่วยงาน
    this.provinceCodeFromControl = this.formBuilder.control(''); // รหัสจังหวัด
    this.provinceCodeToControl = this.formBuilder.control(''); // รหัสจังหวัด
    this.yearAccountControl = this.formBuilder.control(this.utils.fisc_year); // ปีบัญชี
    this.postDateFromControl = this.formBuilder.control(''); // วันผ่านรายการ
    this.postDateToControl = this.formBuilder.control(''); // วันผ่านรายการ
    this.vendorTaxIdFromControl = this.formBuilder.control(''); // ผุ้ขาย
    this.vendorTaxIdToControl = this.formBuilder.control(''); // ผุ้ขาย
    this.disbursementCodeFromControl = this.formBuilder.control(''); // รหัสหน่วยเบิกจ่าย
    this.disbursementCodeToControl = this.formBuilder.control(''); // รหัสหน่วยเบิกจ่าย

    this.docTypeFromControl = this.formBuilder.control(''); // ประเภทเอกสาร
    this.docTypeToControl = this.formBuilder.control(''); // ประเภทเอกสาร
    this.payMethodFromControl = this.formBuilder.control(''); // วิธีชำระเงิน
    this.payMethodToControl = this.formBuilder.control(''); // วิธีชำระเงิน
    this.documentDateFromControl = this.formBuilder.control(''); // วันที่เอกสาร
    this.documentDateToControl = this.formBuilder.control(''); // วันที่เอกสาร
    this.documentCreateDateFromControl = this.formBuilder.control(''); // วันที่บันทึก
    this.documentCreateDateToControl = this.formBuilder.control(''); // วันที่บันทึก
    this.specialTypeFromControl = this.formBuilder.control(''); // แยกประเภทพิเศษ
    this.specialTypeToControl = this.formBuilder.control(''); // แยกประเภทพิเศษ

    this.outlineControl = this.formBuilder.control(''); // โครงร่าง

  }

  createFormGroup() {
    this.om011FormCreate = this.formBuilder.group({
      departmentCodeFrom: this.departmentCodeFromControl, // รหัสหน่วยงาน
      departmentCodeTo: this.departmentCodeToControl, // รหัสหน่วยงาน
      provinceCodeFrom: this.provinceCodeFromControl, // รหัสจังหวัด
      provinceCodeTo: this.provinceCodeToControl, // รหัสจังหวัด
      yearAccount: this.yearAccountControl, // ปีบัญชี
      postDateFrom: this.postDateFromControl, // วันผ่านรายการ
      postDateTo: this.postDateToControl, // วันผ่านรายการ
      vendorTaxIdFrom: this.vendorTaxIdFromControl, // ผุ้ขาย
      vendorTaxIdTo: this.vendorTaxIdToControl, // ผุ้ขาย
      disbursementCodeFrom: this.disbursementCodeFromControl, // รหัสหน่วยเบิกจ่าย
      disbursementCodeTo: this.disbursementCodeToControl, // รหัสหน่วยเบิกจ่าย

      docTypeFrom: this.docTypeFromControl, // ประเภทเอกสาร
      docTypeTo: this.docTypeToControl, // ประเภทเอกสาร
      payMethodFrom: this.payMethodFromControl, // วิธีชำระเงิน
      payMethodTo: this.payMethodToControl, // วิธีชำระเงิน
      documentDateFrom: this.documentDateFromControl, // วันที่เอกสาร
      documentDateTo: this.documentDateToControl, // วันที่เอกสาร
      documentCreateDateFrom: this.documentCreateDateFromControl, // วันที่บันทึก
      documentCreateDateTo: this.documentCreateDateToControl, // วันที่บันทึก
      specialTypeFrom: this.specialTypeFromControl, // แยกประเภทพิเศษ
      specialTypeTo: this.specialTypeToControl, // แยกประเภทพิเศษ

      outline: this.outlineControl, // โครงร่าง

    });
  }

  onSearch() {
    const form = this.om011FormCreate.value;
    const payload = {
      compCodeFrom: '',
      compCodeTo: '',
      fiAreaFrom: '',
      fiAreaTo: '',
      fiscalYear: '',
      dateAcctFrom: '',
      dateAcctTo: '',
      bPartnerFrom: '',
      bPartnerTo: '',
      paymentCenterFrom: '',
      paymentCenterTo: '',
      docTypeFrom: '',
      docTypeTo: '',
      paymentMethodFrom: '',
      paymentMethodTo: '',
      dateDocFrom: '',
      dateDocTo: '',
      dateCreatedFrom: '',
      dateCreatedTo: '',
      specialGlFrom: '',
      specialGlTo: ''
    }
    //วันผ่านรายการ
    let postDateFrom = ''
    let postDateTo = ''
    if (form.postDateFrom && form.postDateTo) {
      const dayPostDateFrom = form.postDateFrom.getDate();
      const monthPostDateFrom = form.postDateFrom.getMonth() + 1;
      const yearPostDateFrom = form.postDateFrom.getFullYear();
      const dayPostDateTo = form.postDateTo.getDate();
      const monthPostDateTo = form.postDateTo.getMonth() + 1;
      const yearPostDateTo = form.postDateTo.getFullYear();
      postDateFrom = this.utils.parseDate(dayPostDateFrom, monthPostDateFrom, yearPostDateFrom);
      postDateTo = this.utils.parseDate(dayPostDateTo, monthPostDateTo, yearPostDateTo);
    }
    //วันที่เอกสาร
    let documentDateFrom = ''
    let documentDateTo = ''
    if (form.documentDateFrom && form.documentDateTo) {
      const dayDocumentDateFrom = form.documentDateFrom.getDate();
      const monthDocumentDateFrom = form.documentDateFrom.getMonth() + 1;
      const yearDocumentDateFrom = form.documentDateFrom.getFullYear();
      const dayDocumentDateTo = form.documentDateTo.getDate();
      const monthDocumentDateTo = form.documentDateTo.getMonth() + 1;
      const yearDocumentDateTo = form.documentDateTo.getFullYear();
      documentDateFrom = this.utils.parseDate(dayDocumentDateFrom, monthDocumentDateFrom, yearDocumentDateFrom);
      documentDateTo = this.utils.parseDate(dayDocumentDateTo, monthDocumentDateTo, yearDocumentDateTo);
    }
    // วันที่บันทึก
    let documentCreateDateFrom = ''
    let documentCreateDateTo = ''
    if (form.documentCreateDateFrom && form.documentCreateDateTo) {
      const dayDocumentCreateDateFrom = form.documentCreateDateFrom.getDate();
      const monthDocumentCreateDateFrom = form.documentCreateDateFrom.getMonth() + 1;
      const yearDocumentCreateDateFrom = form.documentCreateDateFrom.getFullYear();
      const dayDocumentCreateDateTo = form.documentCreateDateTo.getDate();
      const monthDocumentCreateDateTo = form.documentCreateDateTo.getMonth() + 1;
      const yearDocumentCreateDateTo = form.documentCreateDateTo.getFullYear();
      documentCreateDateFrom = this.utils.parseDate(dayDocumentCreateDateFrom, monthDocumentCreateDateFrom, yearDocumentCreateDateFrom);
      documentCreateDateTo = this.utils.parseDate(dayDocumentCreateDateTo, monthDocumentCreateDateTo, yearDocumentCreateDateTo);
    }

    payload.compCodeFrom = form.departmentCodeFrom // รหัสหน่วยงาน
    payload.compCodeTo = form.departmentCodeTo // รหัสหน่วยงาน
    payload.fiAreaFrom = form.provinceCodeFrom // รหัสจังหวัด
    payload.fiAreaTo = form.provinceCodeTo // รหัสจังหวัด
    payload.fiscalYear = this.utils.convertYearToAD(form.yearAccount) // ปีบัญชี
    payload.dateAcctFrom = postDateFrom // วันผ่านรายการ
    payload.dateAcctTo = postDateTo// วันผ่านรายการ
    payload.bPartnerFrom = form.vendorTaxIdFrom // ผุ้ขาย
    payload.bPartnerTo = form.vendorTaxIdTo // ผุ้ขาย
    payload.paymentCenterFrom = form.disbursementCodeFrom // รหัสหน่วยเบิกจ่าย
    payload.paymentCenterTo = form.disbursementCodeTo // รหัสหน่วยเบิกจ่าย

    payload.docTypeFrom = form.docTypeFrom // ประเภทเอกสาร
    payload.docTypeTo = form.docTypeTo // ประเภทเอกสาร
    payload.paymentMethodFrom = form.payMethodFrom // วิธีชำระเงิน
    payload.paymentMethodTo = form.payMethodTo // วิธีชำระเงิน
    payload.dateDocFrom = documentDateFrom// วันที่เอกสาร
    payload.dateDocTo = documentDateTo// วันที่เอกสาร
    payload.dateCreatedFrom = documentCreateDateFrom // วันที่บันทึก
    payload.dateCreatedTo = documentCreateDateTo// วันที่บันทึก
    payload.specialGlFrom = form.specialTypeFrom // แยกประเภทพิเศษ
    payload.specialGlTo = form.specialTypeTo // แยกประเภทพิเศษ

    // payload.= form.outline // โครงร่าง

    this.search(payload)
    console.log(payload)


    // let data = {
    //   lineNo: 1,
    //   approve: false,
    //   notApprove: false,
    //   info: '',
    //   diff: 'หัก',
    //   documentType: 'KE',
    //   documentNo: '3200000040',
    //   referenceNo: '3200000041',
    //   year: '2019',
    //   referenceText: 'TEST04',
    //   documentDate: new Date(),
    //   postDate: new Date()


    // }
    // let data1 = {
    //   lineNo: 2,
    //   approve: false,
    //   notApprove: false,
    //   info: '',
    //   diff: 'หัก',
    //   documentType: 'KL',
    //   documentNo: '3600000040',
    //   referenceNo: '',
    //   year: '2020',
    //   referenceText: 'KLเลื่อม',
    //   documentDate: new Date(),
    //   postDate: new Date()


    // }
    // let data2 = {
    //   lineNo: 3,
    //   approve: false,
    //   notApprove: false,
    //   info: '',
    //   diff: '',
    //   documentType: 'KC',
    //   documentNo: '3100000040',
    //   referenceNo: '',
    //   year: '2020',
    //   referenceText: 'PK200',
    //   documentDate: new Date(),
    //   postDate: new Date()

    // }

    // this.listDocument.push(data)
    // this.listDocument.push(data1)
    // this.listDocument.push(data2)




  }

  search(payload) {
    this.loadingScreenService.loadingToggleStatus(true)
    this.listDocument = [];
    this.paymentService.searchPaymentBlock(payload).subscribe(data => {
      this.loadingScreenService.loadingToggleStatus(false)
      this.isDataSearchloaded = true;
      const response = data as any;
      const result = response.data;
      console.log(result)
      if (result) {
        if (result.length > 0 && result.length <= 500) {
          this.listDocument = result;
          this.selectedTabIndex = 1;
          let i = 0
          this.listDocument.forEach(document => {
            document.no = i++
            document.approve = false;
            document.notApprove = false;
            document.reason = ''
          });
        } else if (result.length > 500) {
          this.listMessageResponse.push('ไม่สามารถแสดงผลการค้นหาเกิน 500 รายการได้ กรุณาเปลี่ยนเงื่อนไขการค้นหาใหม่');
        } else {
          this.listMessageResponse.push('ไม่พบเอกสาร');
        }
      } else {
        this.listMessageResponse.push('ไม่พบเอกสาร');
      }
    });
  }

  selectAllApproved() {
    this.listDocument.forEach(document => {
      document.approve = true;
      document.notApprove = false;
    });
  }

  unselectAllApproved() {
    this.listDocument.forEach(document => {
      document.approve = false;
    });
  }

  selectAllNotApproved() {
    this.listDocument.forEach(document => {
      document.notApprove = false;
    });
  }


  setReasonIntoDocument(index, document) {
    console.log(document)
    const getValue = this.reasonInput.toArray()[index].nativeElement.value;
    console.log(getValue)
    this.listDocument[document.no].reason = getValue;
    console.log(this.listDocument[document.no])
  }

  cleanInputReason(index) {
    this.reasonInput.toArray()[index].nativeElement.value = '';
    this.listDocument[index].reason = '';
    // this.isBoxNotApproveShow = true;
  }

  onPreSave() {
    this.listValidate = [];
    const allPageOm01 = new Map();
    allPageOm01.set('path', 'om01');
    allPageOm01.set('create', 'om011');
    allPageOm01.set('search', 'om012');
    const listItem = [];
    const header = this.payloadSearch;
    if (this.listDocument.length > 0) {
      this.listDocument.forEach(document => {
        if (document.approve || document.notApprove) {
          const item = {
            accDocNo: document.accDocNo,
            amount: document.amount,
            approval: '',
            bankAccNo: document.bankAccNo,
            bgArea: this.webInfo.bgArea,
            compCode: this.webInfo.compCode,
            currency: 'THB',
            dateBaseline: '3100000066',
            desc: '',
            docType: document.docType,
            fiscYear: document.fiscYear,
            invDocNo: document.invDocNo,
            paymentCenter: document.paymentCenter,
            paymentMethod: document.paymentMethod,
            reason: document.reason,
            reject: document.reject,
            status: document.status,
            statusAp: document.statusAp,
            userWeb: this.webInfo.userWeb,
            vendor: document.vendor,
            wtWebFlag: document.wtWebFlag
          };
          if (document.approve) {
            item.approval = 'X';
          } else if (document.notApprove) {
            item.reject = 'X';
          }
          listItem.push(item);
        }
      });
    }

    if (listItem.length > 0) {
      const dialogRef = this.dialog.open(DialogSaveOmComponent, {
        width: '80vw',
        data: {
          page: allPageOm01,
          head: header,
          item: listItem,
          webInfo: this.localStorageService.getWebInfo()
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.event === 'save') {
            this.listDocument = [];
          }
          // this.onSearch(this.typeSearch);
        }
      });
    } else {
      this.listValidate.push('กรุณาเลือกรายการ อนุมัติ / ไม่อนุมัติ');
    }
  }

  sortData(sortType) {
    this.orderBy = this.orderBy === 'ASC' ? 'DESC' : 'ASC';
    if (sortType === 'accDocNo') {
      this.sortBy = 'เลขที่เอกสาร';
      if (this.orderBy === 'ASC') {
        this.listDocument.sort((a, b) => (a.accDocNo > b.accDocNo ? 1 : -1));
      } else {
        this.listDocument.sort((a, b) => (b.accDocNo > a.accDocNo ? 1 : -1));
      }
    } else if (sortType === 'fiscYear') {
      this.sortBy = 'ปีงบประมาณ';
      if (this.orderBy === 'ASC') {
        this.listDocument.sort((a, b) => (a.fiscYear > b.fiscYear ? 1 : -1));
      } else {
        this.listDocument.sort((a, b) => (b.fiscYear > a.fiscYear ? 1 : -1));
      }
    } else if (sortType === 'DOC_TYPE') {
      this.sortBy = 'ประเภทเอกสาร';
      if (this.orderBy === 'ASC') {
        this.listDocument.sort((a, b) => (a.DOC_TYPE > b.DOC_TYPE ? 1 : -1));
      } else {
        this.listDocument.sort((a, b) => (b.DOC_TYPE > a.DOC_TYPE ? 1 : -1));
      }
    } else if (sortType === 'paymentMethod') {
      this.sortBy = 'วิธีการชำระเงิน';
      if (this.orderBy === 'ASC') {
        this.listDocument.sort((a, b) => (a.paymentMethod > b.paymentMethod ? 1 : -1));
      } else {
        this.listDocument.sort((a, b) => (b.paymentMethod > a.paymentMethod ? 1 : -1));
      }
    } else if (sortType === 'amount') {
      this.sortBy = 'จำนวนเงินขอเบิก';
      if (this.orderBy === 'ASC') {
        this.listDocument.sort((a, b) => (a.amount > b.amount ? 1 : -1));
      } else {
        this.listDocument.sort((a, b) => (b.amount > a.amount ? 1 : -1));
      }
    }
  }

  checkValidateDocNo(form, type) {
    this.listValidate = [];
    if (type === 'normal') {
      const keyValidate = new Map();
      if (!form.docNoFrom) {
        if (!form.docNoFrom) {
          keyValidate.set('docNoFrom', form.docNoFrom);
        }
        // else if (!form.docNoTo) {
        //   keyValidate.set('docNoTo', form.docNoTo);
        // }
      }
      this.utils.checkValidateSearchNormalRequired(keyValidate, this.listValidate);
    } else if (type === 'condition') {
    }
  }

  onClickCheckedDocument(index, type) {
    console.log(index)
    if (this.p != 1) {
      index = this.p * this.perPage - (this.perPage - index);
    }
    if (type === 'approved') {
      if (this.listDocument[index].approve) {
        this.listDocument[index].approve = false;
      } else {
        this.listDocument[index].approve = true;
      }
      this.isBoxNotApproveShow = true;
      this.listDocument[index].notApprove = false;
    } else {
      if (this.listDocument[index].notApprove) {
        this.listDocument[index].notApprove = false;
        this.isBoxNotApproveShow = true;
      } else {
        this.listDocument[index].notApprove = true;
        this.isBoxNotApproveShow = false;
      }
      this.listDocument[index].approve = false;
    }

    console.log(this.listDocument)
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = tabChangeEvent.index;
  }

  checkTab(type) {
    if (type === 'prev') {
      this.selectedTabIndex = this.selectedTabIndex - 1;
    } else {
      this.selectedTabIndex = this.selectedTabIndex + 1;
    }
  }
  viewDocument(docNo, docYear) {
    const url = './detail-fi?docNo=' + docNo + '&docYear=' + docYear;
    window.open(url, 'name', 'width=1200,height=700');
  }

  // onChangeConditionFrom(e) {
  //   const form = this.om011FormCreate.value
  //   if (form.conditionFrom > form.conditionTo) {
  //     this.om011FormCreate.patchValue({
  //       conditionTo: e.value,
  //     });
  //   }
  // }

  minFilter = (d: Date): boolean => {
    const from = new Date(this.om011FormCreate.get('conditionFrom').value);
    if (d < from) {
      return false;
    }
    return true;
  }
  openCollapseDetail() {
    this.isOpenCollapseDetail = !this.isOpenCollapseDetail;
  }


  openDialogSearch(type) {
    let specialCase: any;
    // เลขที่เอกสารสำรองเงิน
    // if (type === 'backupDocument') {
    //   specialCase = {
    //     formId: this.constant.FORM_ID_BC.bc01,
    //     departmentCode: this.om011FormCreate.get('departmentCode').value,
    //     disbursementCode: this.om011FormCreate.get('disbursementCode').value,
    //   };
    // } else if (type === 'centerCode') {
    //   specialCase = {
    //     departmentCode: this.om011FormCreate.get('departmentCode').value,
    //     disbursementCode: this.om011FormCreate.get('disbursementCode').value,
    //     areaCode: this.om011FormCreate.get('areaCode').value,
    //   };
    // } else if (type === 'sourceMoneyCode') {
    //   specialCase = {
    //     year: this.om011FormCreate.get('yearSourceMoney').value,
    //   };
    // } else if (type === 'sourceBudgetCode') {
    //   specialCase = {
    //     departmentCode: this.om011FormCreate.get('departmentCode').value,
    //     year: this.om011FormCreate.get('yearSourceMoney').value,
    //   };
    // } else if (type === 'mainActivityCode') {
    //   specialCase = {
    //     departmentCode: this.om011FormCreate.get('departmentCode').value,
    //     year: this.om011FormCreate.get('yearSourceMoney').value,
    //   };
    // } else if (type === 'subActivityCode') {
    //   specialCase = {
    //     departmentCode: this.om011FormCreate.get('departmentCode').value,
    //     year: this.om011FormCreate.get('yearSourceMoney').value,
    //   };
    // } else if (type === 'accountDepositCode') {
    //   specialCase = {
    //     disbursementCode: this.om011FormCreate.get('disbursementCode').value,
    //   };
    // } else if (type === 'subAccountCode') {
    //   specialCase = {
    //     disbursementCode: this.om011FormCreate.get('disbursementCode').value,
    //   };
    // } else if (type === 'bankBook') {
    //   specialCase = {
    //     departmentCode: this.om011FormCreate.get('departmentCode').value,
    //   };
    // } else if (type === 'vendorBankAccount') {
    //   specialCase = {
    //     vendorTaxId: this.om011FormCreate.get('vendorTaxId').value,
    //   };
    // } else if (type === 'storageCenterCode') {
    //   specialCase = {
    //     departmentCode: this.om011FormCreate.get('departmentCode').value,
    //     disbursementCode: this.om011FormCreate.get('disbursementCode').value,
    //   };
    // } else if (type === 'remittanceCenterCode') {
    //   specialCase = {
    //     departmentCode: this.om011FormCreate.get('departmentCode').value,
    //     disbursementCode: this.om011FormCreate.get('disbursementCode').value,
    //   };
    // } else if (type === 'branchNo') {
    //   specialCase = {
    //     bankCode: this.om011FormCreate.get('bankCode').value,
    //   };
    // } else if (type === 'assetMasterNo') {
    //   specialCase = {
    //     departmentCode: this.om011FormCreate.get('departmentCode').value,
    //   };
    // }
    const dialogRef = this.dialog.open(DialogSearchComponent, {
      width: '70vw',
      data: { type, specialCase },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event) {
        this.om011FormCreate.patchValue({ [result.type]: result.value });
        if (type === 'departmentCodeFrom') {
          // รหัสหน่วยงาน จาก
          this.departmentCodeFromBindingName = result.name;
        } else if (type === 'departmentCodeFrom') {
          // รหัสหน่วยงาน ถึง
          this.departmentCodeToBindingName = result.name;
        } else if (type === 'provinceCodeFrom') {
          // รหัสจังหวัด จาก
          this.provinceCodeFromBindingName = result.name;
        }
        else if (type === 'provinceCodeTo') {
          // รหัสจังหวัด ถึง
          this.provinceCodeToBindingName = result.name;
        }
        else if (type === 'vendorTaxIdFrom') {
          // ผู้ขาย จาก
          this.vendorTaxIdFromBindingName = result.name;
        }
        else if (type === 'vendorTaxIdTo') {
          // ผู้ขาย ถึง
          this.vendorTaxIdToBindingName = result.name;
        }
        else if (type === 'disbursementCodeFrom') {
          // หน่วยเบิกจ่าย จาก
          this.disbursementCodeFromBindingName = result.name;
        }
        else if (type === 'disbursementCodeTo') {
          // หน่วยเบิกจ่าย ถึง
          this.disbursementCodeToBindingName = result.name;
        }
      }
    });
  }

  openDialogDetailDocument(document) {
    const dialogRef = this.dialog.open(DialogDetailDocumentComponent, {
      width: '70vw',
      data: {
        document
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
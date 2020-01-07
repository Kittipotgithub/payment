import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Constant } from '@shared/constant';
import { Utils } from '@shared/utils';
import { LocalStorageService } from '@core/services';
import { WebInfoService } from '@core/services/web-info.service';
import { WebInfo } from '@core/models/web-info';
import { FiService } from '@core/services/fi/fi.service';
import { UserProfile } from '@core/models/user-profile';
import { Router } from '@angular/router';
import { DialogSaveOmComponent } from '@shared/component/dialog-save-om/dialog-save-om.component';
import { GlobalObject } from '@shared/global-object';
import { DatepickerHeaderComponent } from '@shared/component/datepicker-header/datepicker-header.component'
import { LoadingScreenService } from '@core/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-om021',
  templateUrl: './om021.component.html',
  styleUrls: ['./om021.component.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
})
export class Om021Component implements OnInit {
  @ViewChildren('reasonInput') reasonInput: QueryList<ElementRef>;
  @ViewChild('tabRef', { static: true }) tabRef: MatTabGroup;

  om021FormCreate: FormGroup;
  departmentCodeControl: FormControl; // รหัสหน่วยงาน
  disbursementCodeControl: FormControl; // รหัสหน่วยเบิกจ่าย
  areaCodeControl: FormControl; // รหัสพื้นที่
  docNoFromControl: FormControl; // เลขที่ใบบันทึกรายการบัญชี เริ่ม
  docNoToControl: FormControl; // เลขที่ใบบันทึกรายการบัญชี ถึง
  yearBudgetFromControl: FormControl; // ปีงบประมาณ
  yearBudgetToControl: FormControl; // ปีงบประมาณ
  searchTypeControl: FormControl; // ประเภทวันที่
  conditionFromControl: FormControl; // วันที่
  conditionToControl: FormControl; // วันที่
  citizenIdFromControl: FormControl; // บัตรประชาชน
  citizenIdToControl: FormControl; // บัตรประชาชน
  docTypeFromControl: FormControl; // ประเภทเอกสาร
  docTypeToControl: FormControl; // ประเภทเอกสาร
  payMethodFromControl: FormControl; // วิธีชำระเงิน
  payMethodToControl: FormControl; // วิธีชำระเงิน

  listValidate = [];
  listMessageResponse = [];
  listDocument: any = [];
  tabAmount: number;
  selectedTabIndex: number = 0;
  p: number = 1;
  perPage: number = 5;
  isBoxNotApproveShow:boolean = true;
  isDataSearchloaded:boolean = false; // for check have data from search
  private payloadSearch;
  private typeSearch;
  sortBy = 'เลขที่เอกสาร'; // not sure api order by
  orderBy = 'ASC'; // 1=ASC 0=DESC
  userProfile: UserProfile;
  webInfo: WebInfo;
  public datePickerHeader = DatepickerHeaderComponent;
  constructor(
    public constant: Constant,
    private formBuilder: FormBuilder,
    private utils: Utils,
    private localStorageService: LocalStorageService,
    private fiService: FiService,
    private globalObject: GlobalObject,
    private dialog: MatDialog,
    private loadingScreenService: LoadingScreenService
  ) { this.loadingScreenService.loadingToggleStatus(true) }

  ngOnInit() {
    this.userProfile = this.localStorageService.getUserProfile();
    this.webInfo = this.localStorageService.getWebInfo();
    this.createFormControl();
    this.createFormGroup();
    this.constant.LIST_YEAR = this.utils.CalculateYear();
    this.loadingScreenService.loadingToggleStatus(false)
  }

  ngAfterViewInit(): void {
    this.tabAmount = this.tabRef._tabs.length;
  }

  createFormControl() {
    this.departmentCodeControl = this.formBuilder.control(this.userProfile.userdata.departmentCode);
    this.disbursementCodeControl = this.formBuilder.control(this.userProfile.userdata.divisionCode);
    this.areaCodeControl = this.formBuilder.control(this.userProfile.userdata.areaCode);
    // normal
    this.docNoFromControl = this.formBuilder.control('');
    this.docNoToControl = this.formBuilder.control('');
    this.yearBudgetFromControl = this.formBuilder.control(this.utils.fisc_year);
    this.yearBudgetToControl = this.formBuilder.control(this.utils.fisc_year);

    // codition
    this.searchTypeControl = this.formBuilder.control('1');
    this.conditionFromControl = this.formBuilder.control(new Date());
    this.conditionToControl = this.formBuilder.control(new Date());
    this.citizenIdFromControl = this.formBuilder.control('');
    this.citizenIdToControl = this.formBuilder.control('');
    this.docTypeFromControl = this.formBuilder.control('');
    this.docTypeToControl = this.formBuilder.control('');
    this.payMethodFromControl = this.formBuilder.control('');
    this.payMethodToControl = this.formBuilder.control('');
  }

  createFormGroup() {
    this.om021FormCreate = this.formBuilder.group({
      departmentCode: this.departmentCodeControl,
      disbursementCode: this.disbursementCodeControl,
      areaCode: this.areaCodeControl,

      docNoFrom: this.docNoFromControl,
      docNoTo: this.docNoToControl,
      yearBudgetFrom: this.yearBudgetFromControl,
      yearBudgetTo: this.yearBudgetToControl,
      searchType: this.searchTypeControl,
      conditionFrom: this.conditionFromControl,
      conditionTo: this.conditionToControl,
      citizenIdFrom: this.citizenIdFromControl,
      citizenIdTo: this.citizenIdToControl,
      docTypeFrom: this.docTypeFromControl,
      docTypeTo: this.docTypeToControl,
      payMethodFrom: this.payMethodFromControl,
      payMethodTo: this.payMethodToControl
    });
  }

  onSearch(type) {
    const form = this.om021FormCreate.value;
    this.checkValidateDocNo(form, type);
    this.listMessageResponse = [];
    const payload = {
      header: {
        accDocNoFrom: '',
        accDocNoTo: '',
        bgArea: this.webInfo.bgArea,
        compCode: this.webInfo.compCode,
        createdFrom: '',
        createdTo: '',
        dateDocFrom: '',
        dateDocTo: '',
        datePostFrom: '',
        datePostTo: '',
        docTypeFrom: '',
        docTypeTo: '',
        fiscYearFrom: '',
        fiscYearTo: '',
        formId: this.constant.FORM_ID_OM.om02,
        paymentCenter: this.webInfo.paymentCenter,
        paymentMethodFrom: '',
        paymentMethodTo: '',
        userWeb: this.webInfo.userWeb,
        vendorTaxIdFrom: '',
        vendorTaxIdTo: ''
      },
      items: [],
      webInfo: this.localStorageService.getWebInfo()
    };
    if (type === 'normal') {
      payload.header.accDocNoFrom = form.docNoFrom;
      payload.header.accDocNoTo = form.docNoTo;
      payload.header.fiscYearFrom = form.yearBudgetFrom;
      payload.header.fiscYearTo = form.yearBudgetTo;
    } else if (type === 'condition') {
      const dayFrom = form.conditionFrom.getDate();
      const monthFrom = form.conditionFrom.getMonth() + 1;
      const yearFrom = form.conditionFrom.getFullYear();
      const dayTo = form.conditionTo.getDate();
      const monthTo = form.conditionTo.getMonth() + 1;
      const yearTo = form.conditionTo.getFullYear();
      if (form.searchType === '1') {
        // วันที่บันทึกรายการ
        payload.header.createdFrom = this.utils.parseDate(dayFrom, monthFrom, yearFrom);
        payload.header.createdTo = this.utils.parseDate(dayTo, monthTo, yearTo);
      } else if (form.searchType === '2') {
        // วันที่ผ่านรายการ
        payload.header.datePostFrom = this.utils.parseDate(dayFrom, monthFrom, yearFrom);
        payload.header.datePostTo = this.utils.parseDate(dayTo, monthTo, yearTo);
      } else if (form.searchType === '3') {
        // วันที่เอกสาร
        payload.header.dateDocFrom = this.utils.parseDate(dayFrom, monthFrom, yearFrom);
        payload.header.dateDocTo = this.utils.parseDate(dayTo, monthTo, yearTo);
      }
      payload.header.paymentMethodFrom = form.payMethodFrom;
      payload.header.paymentMethodTo = form.payMethodTo;
      payload.header.docTypeFrom = form.docTypeFrom;
      payload.header.docTypeTo = form.docTypeTo;

      payload.header.vendorTaxIdFrom = form.citizenIdFrom;
      payload.header.vendorTaxIdTo = form.citizenIdTo;
    }
    if (this.listValidate.length <= 0) {
      this.payloadSearch = payload.header;
      this.typeSearch = type;
      this.search(payload);
    }
  }

  search(payload) {
    this.loadingScreenService.loadingToggleStatus(true)
    this.listDocument = [];
    this.fiService.changePaymentBlock(payload).subscribe(data => {
      this.loadingScreenService.loadingToggleStatus(false)
      this.isDataSearchloaded = true;
      const response = data as any;
      const result = response.data;
      if (result.items) {
        if (result.items.length > 0 && result.items.length <= 500) {
          this.listDocument = result.items;
          this.selectedTabIndex = 1;
          this.listDocument.forEach(document => {
            document.approve = false;
            document.notApprove = false;
          });
        } else if (result.items.length > 500) {
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

  setReasonIntoDocument(index) {
    const value = this.reasonInput.toArray()[index].nativeElement.value;
    this.listDocument[index].reason = value;
    this.isBoxNotApproveShow = true;
  }

  cleanInputReason(index) {
    this.reasonInput.toArray()[index].nativeElement.value = '';
    this.listDocument[index].reason = '';
    this.isBoxNotApproveShow = true;
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
          this.onSearch(this.typeSearch);
        }
      });
    } else {
      this.listValidate.push('กรุณาเลือกรายการ อนุมัติ / ไม่อนุมัติ');
    }
  }

  sortData(sortType) {
    this.orderBy = this.orderBy === 'ASC' ? 'DESC' : 'ASC';
    if (sortType === 'ACC_DOC_NO') {
      this.sortBy = 'เลขที่เอกสาร';
      if (this.orderBy === 'ASC') {
        this.listDocument.sort((a, b) => (a.ACC_DOC_NO > b.ACC_DOC_NO ? 1 : -1));
      } else {
        this.listDocument.sort((a, b) => (b.ACC_DOC_NO > a.ACC_DOC_NO ? 1 : -1));
      }
    } else if (sortType === 'FISC_YEAR') {
      this.sortBy = 'ปีงบประมาณ';
      if (this.orderBy === 'ASC') {
        this.listDocument.sort((a, b) => (a.FISC_YEAR > b.FISC_YEAR ? 1 : -1));
      } else {
        this.listDocument.sort((a, b) => (b.FISC_YEAR > a.FISC_YEAR ? 1 : -1));
      }
    } else if (sortType === 'DOC_TYPE') {
      this.sortBy = 'ประเภทเอกสาร';
      if (this.orderBy === 'ASC') {
        this.listDocument.sort((a, b) => (a.DOC_TYPE > b.DOC_TYPE ? 1 : -1));
      } else {
        this.listDocument.sort((a, b) => (b.DOC_TYPE > a.DOC_TYPE ? 1 : -1));
      }
    } else if (sortType === 'PAYMENT_METHOD') {
      this.sortBy = 'วิธีการชำระเงิน';
      if (this.orderBy === 'ASC') {
        this.listDocument.sort((a, b) => (a.PAYMENT_METHOD > b.PAYMENT_METHOD ? 1 : -1));
      } else {
        this.listDocument.sort((a, b) => (b.PAYMENT_METHOD > a.PAYMENT_METHOD ? 1 : -1));
      }
    } else if (sortType === 'AMOUNT') {
      this.sortBy = 'จำนวนเงินขอเบิก';
      if (this.orderBy === 'ASC') {
        this.listDocument.sort((a, b) => (a.AMOUNT > b.AMOUNT ? 1 : -1));
      } else {
        this.listDocument.sort((a, b) => (b.AMOUNT > a.AMOUNT ? 1 : -1));
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

  onChangeConditionFrom(e) {
    const form = this.om021FormCreate.value
    if(form.conditionFrom > form.conditionTo) {
      this.om021FormCreate.patchValue({
        conditionTo: e.value,
      });
    }
  }

  minFilter = (d: Date): boolean => {
    const from = new Date(this.om021FormCreate.get('conditionFrom').value);
    if ( d < from ) {
      return false;
    }
    return true;
  }
}

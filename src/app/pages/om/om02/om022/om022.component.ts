import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { AppDateAdapter, APP_DATE_FORMATS } from '@shared/format-datepicker';
import { Constant } from '@shared/constant';
import { Utils } from '@shared/utils';
import { DatepickerHeaderComponent } from '@shared/component/datepicker-header/datepicker-header.component'

import { LocalStorageService } from '@core/services';
import { WebInfoService } from '@core/services/web-info.service';
import { WebInfo } from '@core/models/web-info';
import { FiService } from '@core/services/fi/fi.service';
import { UserProfile } from '@core/models/user-profile';
import { LoadingScreenService } from '@core/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-om022',
  templateUrl: './om022.component.html',
  styleUrls: ['./om022.component.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
})
export class Om022Component implements OnInit {
  om022FormSearch: FormGroup;
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
  statusControl: FormControl; // สถานะ

  listValidate = [];
  listMessageResponse = [];
  listDocument: any = [];
  listStatus = [];
  listPaymentType = [];
  p: number = 1;
  sortBy = 'เลขที่เอกสาร';
  orderBy = 'ASC'; // 1=ASC 0=DESC
  userProfile: UserProfile;
  webInfo: WebInfo;
  public datePickerHeader = DatepickerHeaderComponent;

  constructor(
    public constant: Constant,
    private formBuilder: FormBuilder,
    private utils: Utils,
    private webInfoService: WebInfoService,
    private localStorageService: LocalStorageService,
    private fiService: FiService,
    private router: Router,
    private dialog: MatDialog,
    private loadingScreenService: LoadingScreenService
  ) {
    this.loadingScreenService.loadingToggleStatus(true)
  }
  
  ngOnInit() {
    this.userProfile = this.localStorageService.getUserProfile();
    this.webInfo = this.localStorageService.getWebInfo();
    this.createFormControl();
    this.createFormGroup();
    this.constant.LIST_YEAR = this.utils.CalculateYear();
    this.loadingScreenService.loadingToggleStatus(false)
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
    this.statusControl = this.formBuilder.control('');
  }

  createFormGroup() {
    this.om022FormSearch = this.formBuilder.group({
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
      payMethodTo: this.payMethodToControl,
      status: this.statusControl
    });
  }

  onSearch(type) {
    const form = this.om022FormSearch.value;
    this.checkValidateDocNo(form, type);
    this.listMessageResponse = [];
    const header = {
      userWeb: this.userProfile.userdata.username,
      formId: this.constant.FORM_ID_OM.om02,
      compCode: form.departmentCode,
      bgArea: form.areaCode,
      paymentCenter: form.disbursementCode,
      accDocNoFrom: '',
      accDocNoTo: '',
      fiscYearFrom: '',
      fiscYearTo: '',
      datePostFrom: '',
      datePostTo: '',
      dateDocFrom: '',
      dateDocTo: '',
      createdFrom: '',
      createdTo: '',
      vendorTaxIdFrom: '',
      vendorTaxIdTo: '',
      docTypeFrom: '',
      docTypeTo: '',
      paymentMethodFrom: '',
      paymentMethodTo: '',
      decision: ''
    };

    if (type === 'normal') {
      header.accDocNoFrom = form.docNoFrom;
      header.accDocNoTo = form.docNoTo;
      header.fiscYearFrom = this.utils.convertYearToAD(form.yearBudgetFrom);
      header.fiscYearTo = this.utils.convertYearToAD(form.yearBudgetTo);
    } else if (type === 'condition') {
      const dayFrom = form.conditionFrom.getDate();
      const monthFrom = form.conditionFrom.getMonth() + 1;
      const yearFrom = form.conditionFrom.getFullYear();
      const dayTo = form.conditionTo.getDate();
      const monthTo = form.conditionTo.getMonth() + 1;
      const yearTo = form.conditionTo.getFullYear();
      if (form.searchType === '1') {
        // วันที่บันทึกรายการ
        header.createdFrom = this.utils.parseDate(dayFrom, monthFrom, yearFrom);
        header.createdTo = this.utils.parseDate(dayTo, monthTo, yearTo);
      } else if (form.searchType === '2') {
        // วันที่ผ่านรายการ
        header.datePostFrom = this.utils.parseDate(dayFrom, monthFrom, yearFrom);
        header.datePostTo = this.utils.parseDate(dayTo, monthTo, yearTo);
      } else if (form.searchType === '3') {
        // วันที่เอกสาร
        header.dateDocFrom = this.utils.parseDate(dayFrom, monthFrom, yearFrom);
        header.dateDocTo = this.utils.parseDate(dayTo, monthTo, yearTo);
      }
      header.paymentMethodFrom = form.payMethodFrom;
      header.paymentMethodTo = form.payMethodTo;
      header.docTypeFrom = form.docTypeFrom;
      header.docTypeTo = form.docTypeTo;

      header.vendorTaxIdFrom = form.citizenIdFrom;
      header.vendorTaxIdTo = form.citizenIdTo;
      header.decision = form.status;
    }

    if (this.listValidate.length <= 0) {
      const payload = {
        header,
        items: [],
        webInfo: this.localStorageService.getWebInfo()
      };
      this.search(payload);
    }
  }

  search(payload) {
    this.loadingScreenService.loadingToggleStatus(true)
    this.listDocument = [];
    this.fiService.searchLogPaymentBlock(payload).subscribe(data => {
      this.loadingScreenService.loadingToggleStatus(false)
      const response = data as any;
      if (response.data !== null && response.data !== '') {
        if (response.data.items.length > 0 && response.data.items.length <= 500) {
          this.listDocument = response.data.items;
        } else if (response.data.items.length > 500) {
          this.listMessageResponse.push('ไม่สามารถแสดงผลการค้นหาเกิน 500 รายการได้ กรุณาเปลี่ยนเงื่อนไขการค้นหาใหม่');
        } else {
          this.listMessageResponse.push('ไม่พบเอกสาร');
        }
      } else {
        this.listMessageResponse.push('ไม่พบเอกสาร');
      }
    });
  }

  checkValidateDocNo(form, type) {
    this.listValidate = [];
    if (type === 'normal') {
      const keyValidate = new Map();
      if (!form.docNoFrom) {
        keyValidate.set('docNoFrom', form.docNoFrom);
      }
      this.utils.checkValidateSearchNormalRequired(keyValidate, this.listValidate);
    } else if (type === 'condition') {
    }
  }

  viewDocument(docNo, docYear) {
    const url = './detail-fi?docNo=' + docNo + '&docYear=' + docYear;
    window.open(url, 'name', 'width=1200,height=700');
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

  onChangeConditionFrom(e) {
    const form = this.om022FormSearch.value
    if(form.conditionFrom > form.conditionTo) {
      this.om022FormSearch.patchValue({
        conditionTo: e.value,
      });
    }
  }

  minFilter = (d: Date): boolean => {
    const from = new Date(this.om022FormSearch.get('conditionFrom').value);
    if ( d < from ) {
      return false;
    }
    return true;
  }
}

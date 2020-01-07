
import { filter } from 'rxjs/operators';
import { MasterService } from './../../../core/services/master/master.service';
import { Component, OnInit, Output, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '@shared/constant';
import { Utils } from '@shared/utils';
import { UserProfile } from '@core/models/user-profile';
import { LocalStorageService } from '@core/services';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  type: string;
  title: string;
  specialCase: {
    departmentCode: '';
    disbursementCode: '';
    areaCode: '';

    bankCode: '';
    vendorTaxId: '';
    year: '';
    condition: ''
    formId: ''
  };
}

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.scss'],
})
export class DialogSearchComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
  title = 'ค้นหา';
  errorMessage = '';
  dataSource = [];
  dataSourceHeader = [];
  searchType = '';
  isLoading = false;

  isConditionShowSourceBudgetCode = false;

  userProfile: UserProfile;
  constructor(
    public dialogRef: MatDialogRef<DialogSearchComponent>,
    public constant: Constant,
    private masterService: MasterService,
    private localStorageService: LocalStorageService,
    private utils: Utils,
    private _snackBar: MatSnackBar,
   
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    dialogRef.disableClose = false;
  }

  ngOnInit() {
    this.userProfile = this.localStorageService.getUserProfile();

    this.setTitle();
    this.searchType = this.data.type;
  }

  openSnackBar() {
    this._snackBar.open('เกิดความผิดพลาดขึ้น', '', {
      panelClass: '_warning',
    });
  }

  openSnackBar2() {
    this._snackBar.open('บันทึกเรียบร้อย', '', {
      panelClass: '_success',
    });
  }

  setTitle() {
    if (this.data.title !== undefined) {
      this.title = this.data.title;
    } else {
      if (this.data.type === 'typeAccountCode' || this.data.type === 'typeAccountCodeAsset') {
        this.title = 'รหัสบัญชีแยกประเภท';
      } else if (this.data.type === 'centerCode') {
        this.title = 'รหัสศูนย์ต้นทุน';
      } else if (this.data.type === 'ownCenterCode') {
        this.title = 'รหัสศูนย์ต้นทุนเจ้าของรายได้';
      } else if (this.data.type === 'areaCode') {
        this.title = 'รหัสพื้นที่';
      } else if (this.data.type === 'sourceMoneyCode') {
        this.title = 'รหัสแหล่งของเงิน';
      } else if (this.data.type === 'sourceBudgetCode') {
        this.title = 'รหัสงบประมาณ';
      } else if (this.data.type === 'mainActivityCode') {
        this.title = 'รหัสกิจกรรมหลัก';
      } else if (this.data.type === 'subActivityCode') {
        this.title = 'รหัสกิจกรรมย่อย';
      } else if (this.data.type === 'subAccountCode') {
        this.title = 'รหัสบัญชีย่อย';
      } else if (this.data.type === 'accountDepositCode') {
        this.title = 'รหัสบัญชีเงินฝากคลัง';
      } else if (this.data.type === 'packageCode') {
        this.title = 'รหัสหมวดพัสดุ';
      } else if (this.data.type === 'gpscCode') {
        this.title = 'รหัส GPSC';
      } else if (this.data.type === 'vendorTaxId' || this.data.type === 'vendorTaxId2') {
        this.title = 'รหัสประจำตัวผู้เสียภาษี(ผู้ขาย)';
      } else if (this.data.type === 'vendorBankAccount') {
        this.title = 'เลขที่บัญชีเงินฝากธนาคาร';
      } else if (this.data.type === 'assetCode') {
        this.title = 'หมวดสินทรัพย์';
      } else if (this.data.type === 'unit') {
        this.title = 'หน่วย';
      } else if (this.data.type === 'incomeCode') {
        this.title = 'รหัสรายได้';
      } else if (this.data.type === 'bankBook') {
        this.title = 'Bank book';
      } else if (this.data.type === 'sideList') {
        this.title = 'ด้านรายการ';
      } else if (this.data.type === 'backupDocument') {
        this.title = 'เอกสารสำรองเงิน';
      }
    }
  }

  search(e) {
    this.errorMessage = '';
    this.dataSource = [];
    if (this.data.type === 'typeAccountCode' || this.data.type === 'typeAccountCodeAsset') {
      this.loadTypeAccountCode(e.value);
    } else if (this.data.type === 'centerCode') {
      this.loadCenterCode(e.value);
    } else if (this.data.type === 'ownCenterCode') {
      this.loadOwnCenterCode(e.value);
    } else if (this.data.type === 'areaCode') {
      this.loadAreaCode(e.value);
    } else if (this.data.type === 'sourceMoneyCode') {
      this.loadSourceMoneyDataCode(e.value);
    } else if (this.data.type === 'sourceBudgetCode') {
      this.loadSourceBudgetCode(e.value);
    } else if (this.data.type === 'mainActivityCode') {
      this.loadMainActivityCode(e.value);
    } else if (this.data.type === 'subActivityCode') {
      this.loadSubActivityCode(e.value);
    } else if (this.data.type === 'subAccountCode') {
      this.loadSubAccountCode(e.value);
    } else if (this.data.type === 'packageCode') {
      this.loadPackageCode(e.value);
    } else if (this.data.type === 'branchNo') {
      this.loadBankBranch(e.value);
    } else if (this.data.type === 'accountDepositCode') {
      if (!this.data.specialCase.formId) {
        if (this.data.specialCase.condition) {
          if (this.data.specialCase.condition === 2) {
            this.loadDepositAccountNoCompany(e.value);
          } else {
            this.loadDepositAccount(e.value);
          }
        }else{
          this.loadDepositAccount(e.value);
        }

      }
      else {
        this.loadDepositAccountNoArea(e.value)
      }
    } else if (this.data.type === 'gpscCode') {
      this.loadGPSCCode(e.value);
    } else if (this.data.type === 'vendorTaxId' || this.data.type === 'vendorTaxId2') {
      this.loadVendorTaxId(e.value);
    } else if (this.data.type === 'vendorBankAccount') {
      this.loadVendorBankAccount(e.value);
    } else if (this.data.type === 'assetCode') {
      this.loadAsset(e.value);
    } else if (this.data.type === 'unit') {
      this.loadUnit(e.value);
    } else if (this.data.type === 'incomeCode') {
      this.loadIncome(e.value);
    } else if (this.data.type === 'bankBook') {
      this.loadBankBook(e.value);
    } else if (this.data.type === 'sideList') {
      this.loadSideList(e.value);
    } else if (this.data.type === 'backupDocument') {
      this.loadBudgetReserve(e.value)
    }
  }

  onNoClick(): void {
    this.errorMessage = '';
    this.dialogRef.close({
      event: false,
      type: this.data.type,
      value: '',
    });
  }

  loadDepositAccount(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.masterService
      .findDepositAccountWithParam(this.userProfile.userdata.departmentCode, this.userProfile.userdata.areaCode, textSearch)
      .subscribe(data => {
        const response = data as any;
        this.isLoading = false;
        if (response.status === 'T') {
          this.dataSource = response.data;
          this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.depositAccount;
        } else {
          this.errorMessage = response.message;
        }
      });
  }
  loadDepositAccountNoCompany(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.masterService
      .findDepositAccountNoOwnCompanyWithParam(this.userProfile.userdata.departmentCode, this.userProfile.userdata.areaCode, textSearch)
      .subscribe(data => {
        const response = data as any;
        this.isLoading = false;
        if (response.status === 'T') {
          this.dataSource = response.data;
          this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.depositAccount;
        } else {
          this.errorMessage = response.message;
        }
      });
  }
  loadDepositAccountNoArea(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.masterService
      .findDepositAccountWithParamNoArea(this.userProfile.userdata.departmentCode, textSearch)
      .subscribe(data => {
        const response = data as any;
        this.isLoading = false;
        if (response.status === 'T') {
          this.dataSource = response.data;
          this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.depositAccount;
        } else {
          this.errorMessage = response.message;
        }
      });
  }

  loadTypeAccountCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }

    if (textSearch === '' || textSearch === undefined) {
      this.errorMessage = '* กรุณาระบุเงื่อนไข';
      return false;
    } else {
      this.errorMessage = '';
      this.isLoading = true;
      this.masterService.findTypeAccountWithParam(textSearch).subscribe(data => {
        this.isLoading = false;
        const response = data as any;
        if (response.status === 'T') {
          this.dataSource = response.data;
          this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.typeAccountCode;
        } else {
          this.errorMessage = response.message;
        }
      });
    }
  }

  loadCenterCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findCostCenterWithParam(this.data.specialCase.departmentCode, this.data.specialCase.disbursementCode, this.data.specialCase.areaCode, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.centerCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }
  loadOwnCenterCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findOwnCostCenterWithParam(this.data.specialCase.departmentCode, this.data.specialCase.disbursementCode, this.data.specialCase.areaCode, textSearch).subscribe(data => {

      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.centerCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadAreaCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findAreaCodeWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.areaCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadSourceMoneyDataCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findSourceMoneyWithParam(this.data.specialCase.year, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.sourceMoneyCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadSourceBudgetCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    console.log(this.data);
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService
      .findBudgetCodeWithParam(this.utils.convertYearToAD(this.data.specialCase.year), this.data.specialCase.departmentCode, textSearch)
      .subscribe(data => {
        console.log(data)
        const response = data as any;
        this.isLoading = false;
        if (response.status === 'T') {
          this.dataSource = response.data;
          if (this.data.specialCase.condition) {
            if (this.data.specialCase.condition === 2) {
              this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.sourceBudgetCode2;
              this.isConditionShowSourceBudgetCode = true;
            } else {
              this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.sourceBudgetCode;
              this.isConditionShowSourceBudgetCode = false;
            }
          } else {
            this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.sourceBudgetCode;
            this.isConditionShowSourceBudgetCode = false;
          }
          console.log(this.dataSource)
          console.log(this.dataSourceHeader)
        } else {
          this.errorMessage = response.message;
        }
      });
  }

  loadMainActivityCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService
      .findBudgetAcitivityWithParam(
        this.utils.convertYearToAD(this.data.specialCase.year),
        this.userProfile.userdata.departmentCode,
        textSearch
      )
      .subscribe(data => {
        const response = data as any;
        this.isLoading = false;
        if (response.status === 'T') {
          this.dataSource = response.data;
          this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.mainActivityCode;
        } else {
          this.errorMessage = response.message;
        }
      });
  }

  loadSubActivityCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService
      .findSubActivityWithParam(
        this.utils.convertYearToAD(this.data.specialCase.year),
        this.userProfile.userdata.departmentCode,
        textSearch
      )
      .subscribe(data => {
        const response = data as any;
        this.isLoading = false;
        if (response.status === 'T') {
          this.dataSource = response.data;
          this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.subActivityCode;
        } else {
          this.errorMessage = response.message;
        }
      });
  }

  loadSubAccountCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService
      .findSubAccountWithParam(this.userProfile.userdata.departmentCode, this.userProfile.userdata.areaCode, textSearch)
      .subscribe(data => {
        const response = data as any;
        this.isLoading = false;
        if (response.status === 'T') {
          this.dataSource = response.data;
          this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.subAccountCode;
        } else {
          this.errorMessage = response.message;
        }
      });
  }

  loadPackageCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findProductCategoryWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.packageCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadGPSCCode(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findGPSCWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.gpscCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadVendorTaxId(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findVendorWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.vendorTaxId;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadVendorBankAccount(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findVendorBankAccountWithParam(this.data.specialCase.vendorTaxId, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.vendorBankAccount;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadAsset(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findAssetWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.assetCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  loadUnit(textSearch) {
    var text = ''
    if (textSearch) {
      text = textSearch.toUpperCase();
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findUOMWithParam(text).subscribe(data => {
      this.isLoading = false;
      const response = data as any;
      console.log(response)
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.unit;
      } else {
        this.errorMessage = response.message;
      }
    });
  }
  loadIncome(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findIncomeWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.incomeCode;
      } else {
        this.errorMessage = response.message;
      }
    });
  }
  loadSideList(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findSidListWithParam(textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.sideList;
      } else {
        this.errorMessage = response.message;
      }
    });
  }
  loadBudgetReserve(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;

    const payload = {
      searchWord: textSearch,
      // docNoFrom: '',
      // docNoTo: '',
      // docType: '',
      // dateType: '',
      // dateFrom: '',
      // dateTo: '',
      // budgetCode: '',
      // sourceOfFund: '',
      // budgetArea: '',
      formId: this.data.specialCase.formId,
      webInfo: this.localStorageService.getWebInfo(),
    };
    console.log(payload)

    // this.brService.search(payload).subscribe(data => {
    //   const response = data as any;
    //   this.isLoading = false;
    //   if (response.status === 'T') {
    //     if (response.data.items) {
    //       this.dataSource = response.data.items;
    //       this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.budgetReserve;
    //     } else {
    //       this.errorMessage = 'ไม่พบเอกสาร';
    //     }
    //   } else {
    //     this.errorMessage = response.message;
    //   }
    // });
  }

  loadBankBook(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findbankBookWithParam(this.data.specialCase.departmentCode, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.bankBook;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  // TODO ต่างกันตรงไหนบอกที
  loadBankBranch(textSearch) {
    let percent = textSearch.split('').filter(value => value === '%').length
    for (let i = 0; i < percent; i++) {
      textSearch = textSearch.replace('%', '*')
    }
    let text = textSearch.split('').filter(value => value === '*').length
    if (text > 2) {
      this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
      return false;
    } else {
      let checkCondtion = textSearch.indexOf('**');

      if (checkCondtion === -1) {
        if (textSearch === '*' || textSearch === '**') {
          this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
          return false;
        }
      } else {
        this.errorMessage = 'เงื่อนไขไม่ถูกต้อง';
        return false;
      }
    }
    this.errorMessage = '';
    this.isLoading = true;
    this.masterService.findAllBankBranchByBankCode(this.data.specialCase.bankCode, textSearch).subscribe(data => {
      const response = data as any;
      this.isLoading = false;
      if (response.status === 'T') {
        this.dataSource = response.data;
        this.dataSourceHeader = this.constant.HEADER_DIALOG_SEARCH.bankBranch;
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  chooseDataSearch(value, name, optional, optionalName) {
    this.errorMessage = '';
    this.dialogRef.close({
      event: true,
      type: this.data.type,
      value,
      name,
      optional,
      optionalName,
    });
  }
  chooseDataSearchBudgetReserve(value, name, optional1, optionalName1, optional2, optionalName2) {
    this.errorMessage = '';
    this.dialogRef.close({
      event: true,
      type: this.data.type,
      value,
      name,
      optional1,
      optionalName1,
      optional2,
      optionalName2,
    });
  }
}

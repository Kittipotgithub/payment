import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { FiDocument } from '@core/models/fi-document';
import { FiDocumentDetail } from '@core/models/fi-document-detail';
import { FiPayment } from '@core/models/fi-payment';
import { UserProfile } from '@core/models/user-profile';
import { LocalStorageService } from '..';
import { LoadingScreenService } from '@core/services/loading-screen/loading-screen.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private apiService: ApiService) { }
  // รหัสบัญชีแยกประเภท type Account code
  findTypeAccountWithParam(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/typeAccount/getByValue/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสบัญชีย่อย  getAllCASubAccount
  findSubAccountWithParam(compCode, areaCode, textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/subAccount/getAll/' + compCode + '/' + areaCode;
    } else {
      url = '/master/subAccount/getByValue/' + compCode + '/' + areaCode + '/' + textSearch;
    }

    return this.apiService.get(url).pipe(
      map(result => {
        return result;
      })
    );
  }

  // รหัสสาขา
  findAllBank() {
    return this.apiService.get('/master/bank/getAll').pipe(
      map(data => {
        // check service not return status code
        return data.data;
      })
    );
  }

  // // รหัสสาขา (รหัสธนาคาร)
  // findAllBankBranch() {
  //   return this.apiService.get('/master/bankBranch/getAll').pipe(
  //     map(data => {
  //       // check service not return status code
  //       return data;
  //     })
  //   );
  // }

  // รหัสสาขา (รหัสธนาคาร) all
  findAllBankBranchByBankCode(bankCode, textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/bankBranch/getByBank/' + bankCode;
    } else {
      url = '/master/bankBranch/getByBankAndValue/' + bankCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(result => {
        return result;
      })
    );
  }

  // จังหวัด
  findAllProvince() {
    const result = {
      data: {},
      errors: [],
    };
    return this.apiService.get('/master/getAllProvince').pipe(
      map(data => {
        return data.data;
      })
    );
  }

  // ประเทศ
  findAllCountry() {
    const result = {
      data: {},
      errors: [],
    };
    return this.apiService.get('/master/getAllCountry').pipe(
      map(data => {
        return data.data;
      })
    );
  }

  // หน่วยสินค้า
  findAllUOM() {
    const result = {
      data: {},
      errors: [],
    };
    return this.apiService.get('/master/getAllUOM').pipe(
      map(data => {
        return data.data;
      })
    );
  }

  // รหัส วิธีการจัดซื้อจัดจ้าง
  findAllProcureMethod() {
    return this.apiService.get('/master/procureMethod/getAll').pipe(
      map(data => {
        return data.data;
      })
    );
  }

  // รหัสศูนย์ต้นทุน
  findCostCenterWithParam(compCode, paymentCenter, areaCode, textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/costCenter/getAll/' + compCode + '/' + paymentCenter + '/' + areaCode;
    } else {
      url = '/master/costCenter/getByValue/' + compCode + '/' + paymentCenter + '/' + areaCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }
  // รหัสศูนย์ต้นทุนเจ้าของรายได้
  findOwnCostCenterWithParam(compCode, paymentCenter, areaCode, textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/ownCostCenter/getAll';
    } else {
      url = '/master/ownCostCenter/getByValue/' + compCode + '/' + paymentCenter + '/' + areaCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }
  // รหัสพื้นที่
  findAreaCodeWithParam(textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/area/getAll';
    } else {
      url = '/master/area/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }
  // รหัสพื้นที่ ศูนย์ต้นทุน
  findCenterAreaCodeWithParam(textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/disbursement/getAll';
    } else {
      url = '/master/disbursement/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสแหล่งของเงิน
  findSourceMoneyWithParam(year, textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/fundSource/getAll/' + year;
    } else {
      url = '/master/fundSource/getByValue/' + year + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสงบประมาณ
  findBudgetCodeWithParam(year, compCode, textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/budgetCode/getAll/' + year + '/' + compCode;
    } else {
      url = '/master/budgetCode/getByValue/' + year + '/' + compCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสกิจกรรมหลัก
  findBudgetAcitivityWithParam(year, compCode, textSearch) {
    let url = '';
    if (textSearch === '') {
      url = '/master/mainActivity/getAll/' + year + '/' + compCode;
    } else {
      url = '/master/mainActivity/getByValue/' + year + '/' + compCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสกิจกรรมย่อย
  findSubActivityWithParam(year, compCode, textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/subActivity/getAll/' + year + '/' + compCode;
    } else {
      url = '/master/subActivity/getByValue/' + year + '/' + compCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสบัญชีเงินฝากคลัง
  findDepositAccountWithParam(compCode, areaCode, textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/depositAccount/getAll/' + compCode + '/' + areaCode;
    } else {
      url = '/master/depositAccount/getByValue/' + compCode + '/' + areaCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }
  findDepositAccountNoOwnCompanyWithParam(compCode, areaCode, textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/depositAccountNoOwnCompany/getAll/' + compCode + '/' + areaCode;
    } else {
      url = '/master/depositAccountNoOwnCompany/getByValue/' + compCode + '/' + areaCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }
  // รหัสบัญชีเงินฝากคลังไม่กรองพื้นที่
  findDepositAccountWithParamNoArea(compCode, textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/depositAccount/getAllNoArea/' + compCode;
    } else {
      url = '/master/depositAccount/getByValueNoArea/' + compCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสพัสดุ
  findProductCategoryWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/productCategory/getAll';
    } else {
      url = '/master/productCategory/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัสเลขภาษีผู้ขาย
  findVendorWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/vendor/getAll';
    } else {
      url = '/master/vendor/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // เลขบัญชีผู้ขาย
  findVendorBankAccountWithParam(vendorTaxId, textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/vendorBank/getByTaxId/' + vendorTaxId;
    } else {
      url = '/master/vendorBank/getByTaxAndValue/' + vendorTaxId + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัส gpsc
  findGPSCWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/gpsc/getAll';
    } else {
      url = '/master/gpsc/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // รหัส Asset
  findAssetWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/asset/getAll';
    } else {
      url = '/master/asset/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }
  // รหัส Income
  findIncomeWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/incomeAccount/getAll';
    } else {
      url = '/master/incomeAccount/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }
  // รหัส bank book
  findbankBookWithParam(compCode, textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/getAllCABankBook/' + compCode;
    } else {
      url = '/master/getAllCABankBook/' + compCode + '/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }
  //  ด้านรายการ
  findSidListWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/glSubType/getAll'
    } else {
      url = '/master/glSubType/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }
  // หน่วยสินค้า (สท)
  findUOMWithParam(textSearch): Observable<FiPayment> {
    let url = '';
    if (textSearch === '') {
      url = '/master/uom/getAll';
    } else {
      url = '/master/uom/getByValue/' + textSearch;
    }
    return this.apiService.get(url).pipe(
      map(data => {
        return data;
      })
    );
  }

  // - - - - - - - - - - - -  Find one - - - - - - - - - - - - //

  // หน่วยสินค้า (สท) by text search
  findOneUOM(textSearch) {
    return this.apiService.get('/master/uom/getOne/' + textSearch).pipe(
      map(result => {
        return result;
      })
    );
  }

  // รหัสสาขา (รหัสธนาคาร) by text search
  findOneRountingNo(textSearch) {
    return this.apiService.get('/master/bankBranch/getOne/' + textSearch).pipe(
      map(result => {
        return result;
      })
    );
  }

  findOneDataTypeAccount(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/typeAccount/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataCenter(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/costCenter/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataSourceMoney(year, textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/fundSource/getOne/' + year + '/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataSourceBudget(year, compCode, textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/budgetCode/getOne/' + year + '/' + compCode + '/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataMainActivity(year, textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/mainActivity/getOne/' + year + '/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataSubActivity(year, compCode, textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/subActivity/getOne/' + year + '/' + compCode + '/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataSubAccount(compCode, areaCode, textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/subAccount/getOne/' + compCode + '/' + areaCode + '/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }
// boss edit 6/1/2020
  // findOneDataDepositAccount(compCode, areaCode, textSearch): Observable<FiPayment> {
  //   return this.apiService.get('/master/depositAccount/getOne/' + compCode + '/' + areaCode + '/' + textSearch).pipe(
  //     map(data => {
  //       return data;
  //     })
  //   );
  // }
  findOneDataDepositAccount(compCode, areaCode, textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/depositAccount/getOneNoArea/' + compCode + '/'  + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataPackage(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/productCategory/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataVendor(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/vendor/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataVendorBankAccount(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/vendorBank/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataGPSC(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/gpsc/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneDataAssetAcct(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/assetAcct/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }

  findOneAssetGroup(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/asset/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }
  findOneIncome(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/income/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }
  findOneSidList(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/glSubType/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }
  findOneOwnCenter(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/ownCostCenter/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }
  findOneArea(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/area/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }
  findOnePaymentCenter(textSearch): Observable<FiPayment> {
    return this.apiService.get('/master/paymentCenter/getOne/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }
}

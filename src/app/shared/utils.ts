import { Validators } from '@angular/forms';

export class Utils {
  public current = new Date().getFullYear() + 543;
  private past = this.current - 6;
  private future = this.current + 8;
  public fisc_year = 0;
  public fisc_period = [];
  public round = '0';
  public month = '';

  private listAllValidateRequired = new Map([
    ['department', 'กรุณา กรอก รหัสหน่วยงาน'],
    ['documentDate', 'กรุณา กรอก วันที่เอกสาร'],
    ['areaCode', 'กรุณา กรอก รหัสพื้นที่'],
    ['postDate', 'กรุณา กรอก วันที่ผ่านรายการ'],
    ['disbursementCode', 'กรุณา กรอก รหัสหน่วยเบิกจ่าย'],
    ['documentType', 'กรุณา กรอก ประเภทเอกสาร'],
    ['reserveDocument', 'กรุณา กรอก reserveDocument'],
    ['typeAccountCode', 'กรุณา กรอก รหัสบัญชีแยกประเภท'],
    ['centerCode', 'กรุณา กรอก รหัสศูนย์ต้นทุน'],
    ['centerCodeKeep', 'กรุณา กรอก รหัสศูนย์ต้นทุนจัดเก็บ'],
    ['centerCodeSend', 'กรุณา กรอก รหัสศูนย์ต้นทุนผู้นำส่ง'],


    // ['yearSourceMoney', 'กรุณา กรอก yearSourceMoney'],
    ['contractNo', 'กรุณา กรอก เลขที่สัญญาหรือ เลขที่L/C อย่างใดอย่างหนึ่ง'],
    ['lcNo', 'กรุณา กรอก เลขที่สัญญาหรือ เลขที่L/C อย่างใดอย่างหนึ่ง'],
    ['sourceMoneyCode', 'กรุณา กรอก แหล่งของเงิน'],
    ['sourceBudgetCode', 'กรุณา กรอก รหัสงบประมาณ'],
    ['mainActivityCode', 'กรุณา กรอก รหัสกิจกรรมหลัก'],
    ['subActivityCode', 'กรุณา กรอก รหัสกิจกรรมย่อย'],
    ['accountDepositCode', 'กรุณา กรอก รหัสบัญชีเงินฝากคลัง'],
    ['ownAccountDepositCode', 'กรุณา กรอก รหัสเจ้าของบัญชีเงินฝากคลัง'],
    ['subAccountCode', 'กรุณา กรอก รหัสบัญชีย่อย'],
    ['ownSubAccountCode', 'กรุณา กรอก  รหัสเจ้าของบัญชีย่อย'],
    ['bankBook', 'กรุณา กรอก bankBook'],
    ['packageCode', 'กรุณา กรอก รหัสหมวดพัสดุ'],
    ['tradingPartnerCode', 'กรุณา กรอก tradingPartnerCode'],
    ['incomeCode', 'กรุณา กรอก รหัสรายได้'],
    ['docNoMinistry', 'กรุณา กรอก เลขที่หนังสือกระทรวงการคลัง'],
    ['amountMoney', 'กรุณา กรอก จำนวนเงิน'],
    ['lineDescription', 'กรุณา กรอก รายละเอียดบรรทัดรายการ'],
    ['DocNoSelect', 'กรุณาเลือกรายการ'],
    ['citizenId', 'กรุณา กรอก รหัสประจำตัวผู้เสียภาษี'],
    ['nameTH', 'กรุณา กรอก ชื่อ(ภาษาไทย)'],
    ['vendorTaxIdAnother', 'กรุณา กรอก รหัสผู้ขายหน่วยราชการอื่น'],
    ['typeGroupSeller', 'กรุณา เลือก ประเภทกลุ่มผู้ขาย'],
    ['bankAccountNo', 'กรุณา กรอก หมายเลขบัญชีธนาคาร'],
    ['branchNo', 'กรุณา กรอก รหัสธนาคาร'],
    ['ownAccountNameEN', 'กรุณา กรอก ชื่อเจ้าของบัญชี (ภาษาอังกฤษ)'],
    ['purchasingDocumentNo', 'กรุณา กรอก เอกสารการจัดซื้อ'],
    ['numberContract', 'กรุณา กรอก เลขที่ใบสั่งซื้อ/สัญญา'],
    ['taxIDSeller', 'กรุณา กรอก รหัสประจำตัวผู้เสียภาษี(ผู้ขาย)'],
    ['documentClearedNo', 'กรุณา กรอก เลขที่เอกสารหักล้าง'],
    ['line', 'กรุณา กรอก บรรทัดรายการ'],

    ['digitAccountDeposit', 'กรุณา กรอก รหัสบัญชีเงินฝากคลัง (3หลักท้าย)'],

    ['gpscCode', 'กรุณา กรอก รหัส GPSC'],
    ['unitForOrder', 'กรุณา กรอก ราคาต่อหน่วย'],
    ['additionalText', 'กรุณา กรอก ข้อความเพิ่มเติม'],
    ['amountForOrder', 'กรุณา กรอก จำนวนที่สั่งซื้อ'],
    ['pricePerUnit', 'กรุณา กรอก ราคาต่อหน่วย'],
    ['vendorTaxId', 'กรุณา กรอก รหัสประจำตัวผู้เสียภาษี(ผู้ขาย)'],
    ['vendorBankAccount', 'กรุณา กรอก เลขที่บัญชีเงินฝากธนาคาร'],

    ['GFMISNo', 'กรุณา กรอก เลขที่ใบสั่งซื้อระบบ GFMIS'],
    ['vendorCancelOrderCode', 'กรุณา กรอก ผู้ขอยกเลิก(ผู้ขาย)'],
    ['reasonCancelOrder', 'กรุณา กรอก เหตุผลในการยกเลิก'],
    ['explanationReasonCancelOrder', 'กรุณา กรอก คำอธิบายเหตุผลในการยกเลิก'],

    ['budgetAccount', 'กรุณา กรอก รายการผูกพันงบประมาณ'],
    ['headerText', 'กรุณา กรอก ข้อความ'],
    ['reasonCode', 'กรุณา กรอก เหตุผล'],
    ['reasonDescription', 'กรุณา กรอก รายละเอียดเหตุผล'],
    ['reference', 'กรุณา กรอก การอ้างอิง'],
    ['reference3', 'กรุณา กรอก การอ้างอิง3'],
    ['contractValue', 'กรุณา กรอก มูลค่าตามสัญญา'],

    ['description', 'กรุณา กรอก รายการ'],
    ['vendorName', 'กรุณา กรอก รายชื่อเจ้าหนี้'],
    ['define', 'กรุณา กรอก การกำหนด'],

    ['assetCode', 'กรุณา กรอก  หมวดสินทรัพย์'],
    ['explanation1', 'กรุณา กรอก คำอธิบาย 1'],
    ['productNumber', 'กรุณา กรอก  เลขที่ผลิตภัณฑ์'],
    ['unit', 'กรุณา กรอก 	หน่วย'],
    ['username', 'กรุณา กรอก 	รหัสผู้ใช้งาน'],
    ['amountMoneyCredit', 'กรุณา กรอก จำนวนเงินเครดิต'],
    ['amountMoneyDebit', 'กรุณา กรอก จำนวนเงินเดบิต'],

    ['assetMasterNo', 'กรุณา กรอก เลขที่สินทรัพย์หลัก'],
    ['assetMasterNoTo', 'กรุณา กรอก เลขที่สินทรัพย์หลักใหม่'],
    ['amount', 'กรุณา กรอก จำนวนเงิน'],

    ['documentNo', 'กรุณา กรอก เลขที่เอกสารตั้งเบิก/จ่ายเงินครั้งก่อน'],
    ['vendorTaxId2', 'กรุณา กรอก รหัสเจ้าหนี้'],
    ['netPrice', 'กรุณา กรอก จำนวนเงินสุทธิ'],

    ['depositNo', 'กรุณา กรอก เลขที่ใบนำฝาก'],
    ['documentNoDelivery', 'กรุณา กรอก เลขที่เอกสารส่งมอบ'],
  ]);

  private listReverseValidateRequired = new Map([
    ['docNo', 'กรุณา กรอก เลขที่ใบบันทึกรายการบัญชี'],
    ['reverseReason', 'กรุณา กรอก เหตุผลในการกลับรายการ'],
  ]);

  private listSearchNormalValidateRequired = new Map([
    ['docNoFrom', 'กรุณา กรอก เลขที่เอกสารขอเบิก'],
    ['docNoTo', 'กรุณา กรอก เลขที่เอกสารขอเบิก'],
    ['GFMISNoFrom', 'กรุณากรอกเลขที่ใบสั่งซื้อระบบ GFMIS'],
    ['GFMISNoTo', 'กรุณากรอกเลขที่ใบสั่งซื้อระบบ GFMIS'],
    ['citizenId', 'กรุณา กรอก รหัสประจำตัวผู้เสียภาษี'],
    ['assetNoMainFrom', 'กรุณา กรอก เลขที่สินทรัพย์หลัก'],
    ['assetMasterNoFrom', 'กรุณา กรอก เลขที่สินทรัพย์หลัก'],
  ]);

  private listSearchNormalBCValidateRequired = new Map([
    ['docNoFrom', 'กรุณา กรอก เลขที่ใบบันทึกรายการบัญชี'],
    ['docNoTo', 'กรุณา กรอก เลขที่ใบบันทึกรายการบัญชี'],
  ]);
  private listSearchNormalMaterialValidateRequired = new Map([
    ['docNoFrom', 'กรุณา กรอก เลขที่ใบรับพัสดุ'],
    ['docNoTo', 'กรุณา กรอก เลขที่ใบรับพัสดุ'],
  ]);

  private listCancelValidateRequired = new Map([
    ['docNo', 'กรุณา กรอก เลขที่เอกสารสำรองเงิน'],
    ['cancelReason', 'กรุณา กรอก เหตุผลในการขอยกเลิก'],
  ]);

  private listBankCodeValidate = new Map([
    ['079', '14'],
    ['030', '12'],
    ['033', '033'],
    ['012', '012'],
    ['006', '006'],
    ['030', '030'],
  ]);

  private listBankCodeValidate1 = [
    { id: '079', min: 14, max: 14 },
    { id: '030', min: 12, max: 15 },
    { id: '033', min: 10, max: 12 },
    { id: '012', min: 11, max: 11 },
    { id: '006', min: 10, max: 10 },
    { id: '031', min: 10, max: 10 },
    { id: '028', min: 9, max: 9 },
    { id: '008', min: 12, max: 12 },
    { id: '066', min: 12, max: 12 },
    { id: '010', min: 9, max: 9 },
    { id: '052', min: 13, max: 15 },
    { id: '069', min: 14, max: 14 },
    { id: '067', min: 14, max: 14 },
    { id: '034', min: 10, max: 10 },
    { id: '039', min: 11, max: 11 },
  ];

  public checkValidateRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listAllValidateRequired) {
          if (key1 === key2) {
            if (!value1) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }

  public checkCitizenIdByVendorCode(citizenId, typeGroupSeller, listValidate) {
    if (citizenId != '' && typeGroupSeller != '') {
      let message = '';
      if (citizenId.length !== 13 && typeGroupSeller !== '6000') {
        if (typeGroupSeller === '1000') {
          message = 'รหัสผู้เสียภาษีจะต้องเป็น 13 หลัก';
        } else if (typeGroupSeller === '2000') {
          message = 'สำหรับผู้ขายบุคคลธรรมดา โปรดระบุเลขที่บัตรประชาชน 13 หลัก';
        }
        listValidate.push(message);
      }
    }
  }

  public checkCostcenterWithOwnAccountDeposit(value, listValidate) {
    console.log(value)
    if (value.centerCode && value.ownAccountDepositCode) {
      if (value.centerCode.length > 5 && value.ownAccountDepositCode.length > 5) {
        let centerCode = value.centerCode.toString().substr(0, 5);
        let ownAccountDepositCode = value.ownAccountDepositCode.toString().substr(0, 5);
        console.log(centerCode)
        console.log(ownAccountDepositCode)
        if (centerCode === ownAccountDepositCode) {
        return  listValidate.push('ไม่สามารถกรอกเจ้าของบัญชีเงินฝากคลังตัวนี้ได้');
        }
      }


    }
  }

  public checkReferenceWithYear(key_reference, reference, date, digit, listValidate) {
    const year = this.calculateFiscYear(date);
    const newRef = reference.substr(key_reference.length);
    const parseYear = year.toString().substring(2, 4);
    const parseKeyRef = reference.substring(0, key_reference.length);
    const parseDigit = digit - (key_reference.length + parseYear.length);
    const message = 'กรอกการอ้างอิงไม่ถูกต้อง (ระบุเป็น ' + key_reference + ' + ปี 2 หลัก + running no. ' + parseDigit + ' หลัก)';
    if (newRef.match(/[A-Za-z]/)) {
      // check running number have alphabet
      console.log('have alphabet on runnnong no');
      listValidate.push(message);
    } else if (digit != reference.length) {
      console.log('wrong digit');
      listValidate.push(message);
    } else if (parseKeyRef != key_reference) {
      // check key referrence example 'R'
      console.log('wrong key_reference');
      listValidate.push(message);
    } else if (newRef.substring(0, 2) != parseYear) {
      // check year in reference
      console.log('wrong year key');
      listValidate.push(message);
    }
  }

  public checkReferenceWithYearBcXX(reference, date, digit, listValidate) {
    const year = this.calculateFiscYear(date);
    const newRef = reference;
    const parseYear = year.toString().substring(2, 4);
    const message = 'กรุณาระบุการอ้างอิงจำนวน 15 หลักในรูปแบบ YY + เลขที่เอกสารอ้างอิง + LLL';
    // check digit
    if (digit != reference.length) {
      console.log('wrong digit');
      listValidate.push(message);
    } else if (newRef.substring(0, 2) != parseYear) {
      // check year in reference
      console.log('wrong year key');
      listValidate.push(message);
    }
  }

  public validateBankCode(bankCode, branchNo, bankAccountNo, listValidate) {
    const message = 'กรอกข้อมูลธนาคารไม่สัมพันธ์กัน';
    if (bankCode != '' && branchNo != '' && bankAccountNo != '') {
      let obj = this.listBankCodeValidate1.find(function (node) {
        return node.id === bankCode;
      });
      if (obj) {
        if (branchNo.substring(0, 3) !== obj.id) {
          // listValidate.push(message + "(รหัสธนาคารต้องขึ้นต้นด้วย " + obj.id + ")") ไม่เหมือนเว็บเก่า
          listValidate.push('รหัสธนาคารและชื่อธนาคารไม่สอดคล้องกัน');
        }
        if (bankAccountNo.length < obj.min || bankAccountNo.length > obj.max) {
          listValidate.push('หมายเลขบัญชีธนาคารไม่ถูกต้อง');
        }
      } else {
        if (bankAccountNo.length !== 10) {
          listValidate.push('หมายเลขบัญชีธนาคารไม่ถูกต้อง');
        }
      }
    }
  }

  public CalculateYear() {
    const listYear = [];
    for (let i = this.past; i <= this.future; i++) {
      listYear.push({ id: i, name: i });
    }
    return listYear;
  }

  public checkInputNumberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public checkValidateCenterCodeAndBudgetCode(value, listValidate) {
    const centerCode = value.centerCode.substr(0, 5); // รหัสศูนย์ต้นทุน 5 หลักแรก
    const budgetCode = value.budgetCode.substr(0, 5); // รหัสงบประมาณ 5 หลักแรก

    if (centerCode !== budgetCode) {
      listValidate.push('รหัสศูนย์ต้นทุน และ รหัสงบประมาณ ไม่ถูกต้องตามเงื่อนไข '); // รหัสงบประมาณ 5 หลักแรก = รหัสศูนย์ต้นทุน 5 หลักแรก
    }
  }

  public checkValidateSubAccountAndOwnSubAccount(value, listValidate) {
    const subAccount = value.subAccount; //   รหัสบัญชีย่อย
    const ownSubAccount = value.ownSubAccount; //    รหัสเจ้าของบัญชีย่อย

    const tHead = 'กรุณากรอก';
    if (subAccount && !ownSubAccount) {
      listValidate.push(tHead + 'รหัสเจ้าของบัญชีย่อย ');
    } else if (!subAccount && ownSubAccount) {
      listValidate.push(tHead + 'รหัสบัญชีย่อย ');
    }
  }

  public checkCreditWithDebit(debit, credit, listValidate) {
    const costDebit = debit; //   เดบิตทั้งหมด
    const costCredit = credit; //    เครดิตทั้งหมด

    if (costDebit !== costCredit) {
      listValidate.push(' ยอดรวมเครดิตกับยอดรวมเดบิตต้องเท่ากัน ');
    }
    return listValidate;
  }

  public checkValidateAccountDepositAndOwnAccountDeposit(value, listValidate) {
    const accountDeposit = value.accountDeposit; //  รหัสบัญชีเงินฝากคลัง
    const ownAccountDeposit = value.ownAccountDeposit; //  รหัสเจ้าของบัญชีเงินฝากคลัง

    const tHead = 'กรุณากรอก';
    if (accountDeposit && !ownAccountDeposit) {
      listValidate.push(tHead + 'รหัสเจ้าของบัญชีเงินฝากคลัง ');
    } else if (!accountDeposit && ownAccountDeposit) {
      listValidate.push(tHead + 'รหัสบัญชีเงินฝากคลัง ');
    }
  }

  public checkValidateData(value, listValidate) {
    if (value.sourceMoneyCode.length !== 7) {
      listValidate.push('แหล่งของเงินไม่ถูกต้อง');
    }

    if (value.mainActivityCode.length < 5) {
      listValidate.push('รหัสกิจกรรมหลักไม่ถูกต้อง');
    }

    if (value.sourceBudgetCode.length < 5) {
      listValidate.push('รหัสงบประมาณไม่ถูกต้อง');
    }
  }

  public checkValiateSourceMoney(value, listValidate) {
    if (value.yearSourceMoney && value.sourceMoneyCode) {
      if (value.yearSourceMoney.toString().substr(-2) !== value.sourceMoneyCode.toString().substring(0, 2)) {
        listValidate.push('แหล่งของเงินไม่สัมพันธ์กับปีงบประมาณ');
      } else {
        if (value.sourceMoneyCode.length !== 7) {
          listValidate.push('แหล่งของเงินไม่สัมพันธ์กับปีงบประมาณ');
        }
      }
    }
  }

  public checkValiateReference3(value, listValidate) {
    if (value.reference3) {
      console.log(value.reference3.length);
      if (value.reference3.length !== 16) {
        listValidate.push('กรุณา กรอก คีย์อ้างอิง3 ให้ครบ 16 หลัก');
      }
    }
  }

  public checkValiateSearchLength(value, digit, listValidate) {
    if (value) {
      if (value.length !== digit) {
        listValidate.push('ไม่พบข้อมูลที่ต้องการค้นหา');
      }
    }
  }
  public test(object,value) {
    console.log(object)

    if (object.size > 0) {
      for (const [key1, value1] of object) {
        console.log(key1)
        value.controls[key1].setValidators([Validators.required])
        value.controls[key1].updateValueAndValidity()
      }}
    return value;
  
  }

  public checkValidateRelationshipData(value, areaCenterCode, listValidate) {
    const sourceBudgetCode = value.sourceBudgetCode ? value.sourceBudgetCode.toString() : ''; // รหัสงบประมาณ
    const mainActivityCode = value.mainActivityCode ? value.mainActivityCode.toString() : ''; // รหัสกิจกรรมหลัก
    const centerCode = value.centerCode ? value.centerCode.toString() : ''; // รหัสศูนย์ต้นทุน
    const sourceMoneyCode = value.sourceMoneyCode ? value.sourceMoneyCode.toString() : ''; // แหล่งของเงิน
    const areaCodeCenterCode = areaCenterCode ? 'P' + areaCenterCode.toString() : ''; // รหัสพื้นที่จากศูนย์ต้นทุน

    const year = value.GJAHR !== null && value.GJAHR !== undefined ? value.GJAHR : 0;
    const chkYear = year;

    if (sourceBudgetCode.length >= 5) {
      // const gsber_from_kostl = areaCode;
      // const gsber_from_fkber = mainActivityCode;
      // const areaCode = areaCode;

      const sourceBudgetCodeFiveCharacters = sourceBudgetCode.substr(0, 5); // รหัสงบประมาณ 5 หลักแรก
      const mainActivityCodeFiveCharacters = mainActivityCode.substr(0, 5); // รหัสกิจกรรมหลัก 5 หลักแรก
      const centerCodeFiveCharacters = centerCode.substr(0, 5); // รหัสศูนย์ต้นทุน 5 หลักแรก

      let checked = false;

      // console.log('checkedcheckedcheckedcheckedcheckedchecked')
      // console.log(sourceBudgetCode)
      // console.log(mainActivityCode)
      // console.log(departmentCode)
      // console.log(sourceMoneyCode)
      console.log(areaCodeCenterCode);
      // console.log(sourceBudgetCodeFiveCharacters)
      console.log(mainActivityCodeFiveCharacters);
      // console.log(departmentCodeFiveCharacters)

      // const tHead = 'กรุณากรอก';
      const tHead = '';
      if (
        sourceMoneyCode.substr(2, 2) === '19' &&
        sourceBudgetCodeFiveCharacters === centerCodeFiveCharacters &&
        areaCodeCenterCode === mainActivityCodeFiveCharacters
      ) {
        checked = true;
      } else if (
        (sourceMoneyCode.substr(2, 1) === '2' || sourceMoneyCode.substr(2, 1) === '3') &&
        sourceBudgetCode.length === 5 &&
        sourceBudgetCodeFiveCharacters === centerCodeFiveCharacters &&
        areaCodeCenterCode === mainActivityCodeFiveCharacters
      ) {
        checked = true;
      } else if (sourceMoneyCode.substr(2, 1) === '1') {
        if (
          (sourceMoneyCode.substr(2, 2) === '11' || sourceMoneyCode.substr(2, 2) === '10') &&
          sourceBudgetCode.length === 20 &&
          sourceBudgetCodeFiveCharacters === centerCodeFiveCharacters &&
          centerCodeFiveCharacters === mainActivityCodeFiveCharacters
        ) {
          checked = true;
        } else if (
          sourceMoneyCode.substr(2, 2) === '11' &&
          sourceBudgetCode.length === 20 &&
          sourceBudgetCodeFiveCharacters === '80808' &&
          mainActivityCodeFiveCharacters === '80808'
        ) {
          checked = true;
        } else if (
          sourceMoneyCode.substr(2, 2) === '13' &&
          (sourceBudgetCode.length === 13 ||
            sourceBudgetCode.length === 15 ||
            sourceBudgetCode.length === 17 ||
            sourceBudgetCode.length === 20) &&
          sourceBudgetCodeFiveCharacters === '90909'
        ) {
          checked = true;
        }
      } else if (
        sourceMoneyCode.substr(2, 1) === '4' &&
        sourceBudgetCode.length === 20 &&
        sourceBudgetCodeFiveCharacters === centerCodeFiveCharacters
      ) {
        checked = true;
      } else if (
        sourceMoneyCode.substr(2, 2) === '41' &&
        (sourceBudgetCode.length === 13 ||
          sourceBudgetCode.length === 15 ||
          sourceBudgetCode.length === 17 ||
          sourceBudgetCode.length === 20) &&
        sourceBudgetCodeFiveCharacters === '90909'
      ) {
        checked = true;
      } else {
        checked = false;
      }
      if (!checked) {
        // listValidate.push('แหล่งของเงิน รหัสงบประมาณ รหัสศูนย์ต้นทุน และ รหัสกิจกรรมหลัก ไม่ถูกต้องตามเงื่อนไข !');
        listValidate.push('รหัสงบประมาณ ไม่ถูกต้อง');
        listValidate.push('รหัสกิจกรรมหลัก ไม่ถูกต้อง');
      }
      const geberYY = sourceMoneyCode.substr(0, 2);
      if (year !== null && year !== 0) {
        console.log(geberYY);
        console.log(chkYear.toString().substr(-2));
        if (geberYY !== chkYear.toString().substr(-2)) {
          listValidate.push('กรอกแหล่งของเงินไม่ถูกต้อง (ระบุเป็นปี 2 หลัก+running no. 5 หลัก)');
        }
      }

      return listValidate;
    }
  }

  public checkValidateReverseRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listReverseValidateRequired) {
          if (key1 === key2) {
            if (!value1 || !value1.trim()) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }
  public displayYearSourceMoneyBySourceMoneyCode(sourceMoneyCode) {
    const year = '25';
    let yearSourceMoney = '';
    if (sourceMoneyCode) {
      yearSourceMoney = year + sourceMoneyCode.substr(0, 2);
    }
    console.log(yearSourceMoney);
    return yearSourceMoney;
  }
  public checkSourceMoneyCodeWithPostDate(items, postDate, listValidate) {
    const date = new Date(postDate);
    const year = this.calculateFiscYear(date).toString();
    for (let i = 0; i < items.length; i++) {
      if (items[i].sourceMoneyCode) {
        if (year.substr(2, 3) !== items[i].sourceMoneyCode.substr(0, 2)) {
          listValidate.push('ไม่อนุญาตให้ทำเอกสารข้ามปีงบประมาณ');
          return listValidate;
        }
      }
    }
  }
  public checkBackupDocument(items) {
    let checkBackupDocument = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].backupDocument) {
        checkBackupDocument = true;
        return checkBackupDocument;
      } else {
        checkBackupDocument = false;
      }
    }
    return checkBackupDocument;
  }

  public checkValidateTradingPartner(username, tradingPartnerCode, listValidate) {
    if (username.substr(0, 5) === tradingPartnerCode.substr(0, 5)) {
      listValidate.push('กรุณากรอกรหัสหน่วยงานคู่ค้า (Trading Partner) ของหน่วยงานอื่น !');
    }
    return listValidate;
  }

  public checkValidateSearchBCNormalRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listSearchNormalBCValidateRequired) {
          if (key1 === key2) {
            if (!value1 || !value1.trim()) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }
  public checkValidateSearchMaterialNormalRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listSearchNormalMaterialValidateRequired) {
          if (key1 === key2) {
            if (!value1 || !value1.trim()) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }

  public checkValidateSearchNormalRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listSearchNormalValidateRequired) {
          if (key1 === key2) {
            if (!value1 || !value1.trim()) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }

  public checkValidateCancelRequired(object: any, listValidate) {
    if (object.size > 0) {
      for (const [key1, value1] of object) {
        for (const [key2, value2] of this.listCancelValidateRequired) {
          if (key1 === key2) {
            console.log(value1.trim());
            if (!value1 || !value1.trim()) {
              listValidate.push(value2);
            }
          }
        }
      }
    }
    return listValidate;
  }

  public parseDate(day, month, year) {
    day = +day < 10 ? '0' + day : day;
    month = +month < 10 ? '0' + month : month;
    return year + '-' + month + '-' + day;
  }

  /*
   * for backup parse date
   *
   * */
  public parseDateBackup(day, month, year) {
    // let day = date.getDate()
    day = +day < 10 ? '0' + day : day;
    // let month = date.getMonth()
    month = +month < 10 ? '0' + month : month;

    return year + '-' + month + '-' + day;
  }

  public calculateFiscYear(date: Date) {
    const month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month >= 10) {
      return (year = date.getFullYear() + 544); // old code
    } else {
      return year + 543; // old code
    }
  }
  public calculateReverseDate(date: Date) {
    let dateReverse = new Date(date);
    let month = dateReverse.getMonth() + 1;
    const day = dateReverse.getDate();
    dateReverse.setMonth(9);
    dateReverse.setDate(1);

    return dateReverse;
    // if (month === 9 && day === 30 || month >= 10) {
    //   dateReverse.setFullYear(dateReverse.getFullYear())
    //   dateReverse.setMonth(9)
    //   dateReverse.setDate(1)
    //   return dateReverse

    // } else {
    //   dateReverse.setFullYear(dateReverse.getFullYear() - 1)
    //   dateReverse.setMonth(9)
    //   dateReverse.setDate(1)
    //   return dateReverse
    // }
  }

  public calculateRound(date: Date) {
    const month = date.getMonth() + 1;
    if (month >= 4 && month <= 9) {
      return '1';
    } else {
      return '2';
    }
  }

  public calculateMonth(date: Date) {
    const month = date.getMonth() + 1;
    return this.getMonthName(month);
  }

  public bcCalculateFiscPeriod(date: Date) {
    this.fisc_period = [];
    const listFiscPeriod = [];
    const relationshipPeriod = new Map();
    relationshipPeriod.set('1', '4');
    relationshipPeriod.set('2', '5');
    relationshipPeriod.set('3', '6');
    relationshipPeriod.set('4', '7');
    relationshipPeriod.set('5', '8');
    relationshipPeriod.set('6', '9');
    relationshipPeriod.set('7', '10');
    relationshipPeriod.set('8', '11');
    relationshipPeriod.set('9', '12');
    relationshipPeriod.set('10', '1');
    relationshipPeriod.set('11', '2');
    relationshipPeriod.set('12', '3');

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month === 9 && day === 30) {
      listFiscPeriod.push('12');
      listFiscPeriod.push('13');
      listFiscPeriod.push('14');
      listFiscPeriod.push('15');
      listFiscPeriod.push('16');
      this.fisc_period = listFiscPeriod;
      return listFiscPeriod;
    } else {
      const result = relationshipPeriod.get(month.toString());
      listFiscPeriod.push(result);
      this.fisc_period = listFiscPeriod;
      return listFiscPeriod;
    }
  }
  public kbCalculateFiscPeriod(date: Date) {
    this.fisc_period = [];
    const listFiscPeriod = [];
    const relationshipPeriod = new Map();
    relationshipPeriod.set('1', '4');
    relationshipPeriod.set('2', '5');
    relationshipPeriod.set('3', '6');
    relationshipPeriod.set('4', '7');
    relationshipPeriod.set('5', '8');
    relationshipPeriod.set('6', '9');
    relationshipPeriod.set('7', '10');
    relationshipPeriod.set('8', '11');
    relationshipPeriod.set('9', '12');
    relationshipPeriod.set('10', '1');
    relationshipPeriod.set('11', '2');
    relationshipPeriod.set('12', '3');

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month === 9 && day === 30) {
      listFiscPeriod.push('12');
      this.fisc_period = listFiscPeriod;
      return listFiscPeriod;
    } else {
      const result = relationshipPeriod.get(month.toString());
      listFiscPeriod.push(result);
      this.fisc_period = listFiscPeriod;
      return listFiscPeriod;
    }
  }

  public parseOrderNoToString(orderNo) {
    let s = orderNo;
    while (s.length < 4) {
      s = '0' + s;
    }
    console.log('s ===', s);
    return s;
  }

  public parseOrderNoToNumber(orderNo) {
    let s = orderNo;
    while (s.length < 4) {
      s = '0' + s;
    }
    console.log('s ===', s);
    return s;
  }

  public convertYearToAD(year: string): string {
    if (year) {
      const buddhistYear = Number(year);
      const adYear = buddhistYear - 543;
      return adYear.toString();
    } else {
      return new Date().getFullYear.toString();
    }
  }

  public convertYearToBuddhist(year: string): number {
    if (year) {
      const AD = Number(year);
      const buddhistYear = AD + 543;
      return buddhistYear;
    } else {
      return new Date().getFullYear();
    }
  }

  public convertDateFromExcel(exdate) {
    const e0date = new Date(0); // epoch "zero" date
    const offset = e0date.getTimezoneOffset(); // tz offset in min
    const jsdate = new Date(0, 0, exdate - 1, 0, -offset, 0);
    const jsdate2 = jsdate.toJSON();
    const dateParts2 = jsdate2.split('T');
    return dateParts2[0];
  }

  public convertMonthNameThai(fullMonth: string) {
    const month = fullMonth.split('-')[0];
    let monthThai = '';
    switch (month) {
      case 'Jan':
        monthThai = 'มกราคม';
        break;
      case 'Feb':
        monthThai = 'กุมภาพันธ์';
        break;
      case 'Mar':
        monthThai = 'มีนาคม';
        break;
      case 'Apr':
        monthThai = 'เมษายน';
        break;
      case 'May':
        monthThai = 'พฤษภาคม';
        break;
      case 'Jun':
        monthThai = 'มิถุนายน';
        break;
      case 'Jul':
        monthThai = 'กรกฎาคม';
        break;
      case 'Aug':
        monthThai = 'สิงหาคม';
        break;
      case 'Sep':
        monthThai = 'กันยายน';
        break;
      case 'Oct':
        monthThai = 'ตุลาคม';
        break;
      case 'Nov':
        monthThai = 'พฤศจิกายน';
        break;
      case 'Dec':
        monthThai = 'ธันวาคม';
        break;
      default:
        monthThai = '';
        break;
    }
    return monthThai;
  }

  public getMonthName(month: number) {
    let monthThai = '';
    switch (month) {
      case 1:
        monthThai = 'มกราคม';
        break;
      case 2:
        monthThai = 'กุมภาพันธ์';
        break;
      case 3:
        monthThai = 'มีนาคม';
        break;
      case 4:
        monthThai = 'เมษายน';
        break;
      case 5:
        monthThai = 'พฤษภาคม';
        break;
      case 6:
        monthThai = 'มิถุนายน';
        break;
      case 7:
        monthThai = 'กรกฎาคม';
        break;
      case 8:
        monthThai = 'สิงหาคม';
        break;
      case 9:
        monthThai = 'กันยายน';
        break;
      case 10:
        monthThai = 'ตุลาคม';
        break;
      case 11:
        monthThai = 'พฤศจิกายน';
        break;
      case 12:
        monthThai = 'ธันวาคม';
        break;
      default:
        monthThai = '';
        break;
    }
    return monthThai;
  }

  // public checkValidateRelationBankCode(bankCode, bankNo, listValidate) {
  //   if (bankCode !== bankNo) {
  //     listValidate.push('รหัสธนาคารและชื่อธนาคารไม่สอดคล้องกัน');
  //   }
  //   return listValidate;
  // }
}

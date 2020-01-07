import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '@shared/constant';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

//recieve data from parent
export interface DialogData {
  prepaidValue: any;
}
@Component({
  selector: 'app-dialog-payment-advance',
  templateUrl: './dialog-payment-advance.component.html',
  styleUrls: ['./dialog-payment-advance.component.scss']
})
export class DialogPaymentAdvanceComponent implements OnInit {
  dialogPrepaidForm: FormGroup;
  prepaidValueControl: FormControl; // จำนวนเงินจ่ายล่วงหน้า
  isLoading: boolean = false;
  prepaidValue
  constructor(
    public dialogRef: MatDialogRef<DialogPaymentAdvanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public constant: Constant,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createFormControl()
    this.createFormGroup();
    this.prepaidValue = this.data.prepaidValue
    if(this.prepaidValue!==null){
      this.setInputFormEditTax(this.prepaidValue)
    }
  }

  createFormControl() {
    this.prepaidValueControl = this.formBuilder.control(''); // จำนวนเงินจ่ายล่วงหน้า
  }

  createFormGroup() {
    this.dialogPrepaidForm = this.formBuilder.group({
      prepaidValue: this.prepaidValueControl,
    })
  }
  setInputFormEditTax(data){
    this.dialogPrepaidForm.patchValue({
      prepaidValue:data.prepaidValue
    })
  }

  onNoClick(): void {
    this.dialogRef.close({ event: 'cancle' });
  }

  onClickSave() {
    this.prepaidValue =null;
    const form = this.dialogPrepaidForm.value
    const prepaid = {
      prepaidValue:form.prepaidValue
    }

    if(prepaid.prepaidValue){
      this.prepaidValue=prepaid;
    }
    else{
      this.prepaidValue=null;
    }

    this.dialogRef.close({
      event: 'save',
      prepaidValue: this.prepaidValue
    });
  }
}
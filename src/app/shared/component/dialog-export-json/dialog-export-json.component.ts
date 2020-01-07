import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '@shared/constant';
import { MatSnackBar } from '@angular/material/snack-bar';
//recieve data from parent
export interface DialogData {
  page: any;
  json_text: any;
}

@Component({
  selector: 'app-dialog-export-json',
  templateUrl: './dialog-export-json.component.html',
  styleUrls: ['./dialog-export-json.component.scss']
})
export class DialogExportJsonComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogExportJsonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public constant: Constant,
    private _snackBar: MatSnackBar,
  ) { }
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({ event: 'cancle' });
  }

  copyToClipBoard(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

    this._snackBar.open('Copy JSON success', '', {
      panelClass: '_success'
    });
  }

}

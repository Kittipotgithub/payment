import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
export interface DialogData {}

@Component({
  selector: 'app-dialog-user-guide',
  templateUrl: './dialog-user-guide.component.html',
  styleUrls: ['./dialog-user-guide.component.scss']
})

export class DialogUserGuideComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogUserGuideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({ event: 'cancle' });
  }

}

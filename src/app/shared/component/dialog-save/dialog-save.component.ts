import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateFiBody } from '@core/models/create-fi-body';
import { CreateFiHead } from '@core/models/create-fi-head';

import { Constant } from '@shared/constant';
import { WebInfo } from '@core/models/web-info';
import { LocalStorageService } from '@core/services';
import { DialogExportXmlComponent } from '../dialog-export-xml/dialog-export-xml.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogExportJsonComponent } from '../dialog-export-json/dialog-export-json.component';
export interface DialogData {
  page: any;
  head: CreateFiHead;
  item: CreateFiBody[];
  headerTable: [];
}

@Component({
  selector: 'app-dialog-save',
  templateUrl: './dialog-save.component.html',
  styleUrls: ['./dialog-save.component.scss']
})
export class DialogSaveComponent implements OnInit {
  listResultPresave = [];
  resultSave = null;

  isPresaveSuccess = true;
  isSaveSuccess = false;
  allPage: any;
  pathPage: string;
  createPage: string;
  searchPage: string;
  backListPage: string;
  editPage: string;
  webInfo: WebInfo;
  xml: string;
  jsonString: string;

  isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    // private createFiService: FiService,
    // private reportService: ReportService,
    public constant: Constant,
    private router: Router,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    //for detect dialog close 
    dialogRef.backdropClick().subscribe(() => {
      console.log("close dialog")
      // ส่ง event param ตาม ปกติเลย
      if (this.isSaveSuccess && this.resultSave.accDocNo) {
        this.dialogRef.close({ event: 'savesucess' });
      } else {
        this.dialogRef.close({ event: 'close' });
      }
    })
  }

  ngOnInit() {
    this.allPage = this.data.page;
    this.findPage();
    // this.save(0, this.data.head, this.data.item);
  }

  findPage() {
    if (this.allPage.size > 0) {
      for (const [key, value] of this.allPage) {
        if (key === 'path') {
          this.pathPage = value;
        } else if (key === 'create') {
          this.createPage = value;
        } else if (key === 'search') {
          this.searchPage = value;
        } else if (key === 'backList') {
          this.backListPage = value;
        } else if (key === 'edit') {
          this.editPage = value;
        }
      }
    }
  }

  // save(flag: number, head: {}, items: {}) {
  //   this.isLoading = true;
  //   const itemsAll = {
  //     header: this.data.head,
  //     items: this.data.item,
  //     webInfo: this.localStorageService.getWebInfo()
  //   };
  //   this.createFiService.create(itemsAll).subscribe(result => {
  //     this.listResultPresave = [];
  //     const resultMessages = result.data.messages;
  //     if (flag === 0) {
  //       if (result.status === 'F') {
  //         if (resultMessages.length > 0) {
  //           this.listResultPresave = resultMessages;
  //           this.isPresaveSuccess = false;
  //           this.isSaveSuccess = false;
  //         }
  //       }
  //       else if (result.status === 'E') {
  //         this.dialogRef.close({ event: 'cancle' });
  //         this._snackBar.open(result.message, '', {
  //           panelClass: '_warning'
  //         });
  //         this.isLoading = false;
  //       }
  //       else {
  //         this.isPresaveSuccess = true;
  //         this.isSaveSuccess = false;
  //         this.listResultPresave = resultMessages;
  //       }
  //       this.xml = result.xml;
  //       this.jsonString = result.jsonObject
  //     } else if (flag === 1) {
  //       if (result.status === 'F') {
  //         if (resultMessages.length > 0) {
  //           this.listResultPresave = resultMessages;
  //           this.isPresaveSuccess = false;
  //           this.isSaveSuccess = false;
  //         }
  //       } else {
  //         this.isPresaveSuccess = false;
  //         this.isSaveSuccess = true;
  //         this.resultSave = {
  //           accDocNo: result.data.accDocNo,
  //           compCode: result.data.compCode,
  //           fiscYear: result.data.fiscYear
  //         };
  //       }
  //       this.xml = result.xml;
  //       this.jsonString = result.jsonObject
  //     }
  //     this.isLoading = false;
  //     return result;
  //   });
  // }

  // onClickExportXML() {
  //   // may be receieve xml data from service
  //   const dialogRef = this.dialog.open(DialogExportXmlComponent, {
  //     width: '70vw',
  //     data: {
  //       page: this.data.page,
  //       xml_text: this.xml
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => { });
  //   // this.dialogRef.close({ event: 'cancle' });
  // }
  // onClickExportJSON() {
  //   // may be receieve xml data from service
  //   const dialogRef = this.dialog.open(DialogExportJsonComponent, {
  //     width: '70vw',
  //     data: {
  //       page: this.data.page,
  //       json_text: this.jsonString
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => { });
  //   // this.dialogRef.close({ event: 'cancle' });
  // }


  // onConfirmSave() {
  //   this.data.head.flag = 1;
  //   this.save(1, this.data.head, this.data.item);
  // }

  // onNoClick(): void {
  //   if (this.isSaveSuccess && this.resultSave.accDocNo) {
  //     this.dialogRef.close({ event: 'savesucess' });
  //   } else {
  //     this.dialogRef.close({ event: 'close' });
  //   }
  // }

  // onEditDocument(): void {
  //   this.dialogRef.close({ event: 'cancle' });
  // }

  // onCreateNewDocument(): void {
  //   this.router.navigate([this.pathPage + '/' + this.createPage]);
  //   this.dialogRef.close();
  // }

  // onDisplayDocument() {
  //   if (this.isSaveSuccess) {
  //     this.router.navigate([this.pathPage + '/' + this.createPage], {
  //       queryParams: { docNo: this.resultSave.accDocNo, docYear: this.resultSave.fiscYear }
  //     });
  //     this.dialogRef.close({ event: 'search' });
  //   }
  // }

  // onSearchPage(): void {
  //   this.router.navigate([this.pathPage + '/' + this.searchPage]);
  //   this.dialogRef.close();
  // }

  // printReport(type) {
  //   const payload = {
  //     compCode: this.resultSave.compCode,
  //     docNo: this.resultSave.accDocNo,
  //     fiscYear: this.resultSave.fiscYear,
  //     formId: this.data.head.formId,
  //     format: type
  //   };
  //   this.reportService.reportLog(payload);
  // }
}

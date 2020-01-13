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
import { LoadingScreenService } from '@core/services/loading-screen/loading-screen.service';
import { PaymentService } from '@core/services/payment/payment.service';
export interface DialogData {
  page: any;
  head: CreateFiHead;
  item: CreateFiBody[];
  headerTable: [];
  document: any;
}
@Component({
  selector: 'app-dialog-detail-document',
  templateUrl: './dialog-detail-document.component.html',
  styleUrls: ['./dialog-detail-document.component.scss']
})
export class DialogDetailDocumentComponent implements OnInit {
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

  listDocument = []
  listMessageResponse = []
  p = 1;

  documentDetail

  isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogDetailDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    // private createFiService: FiService,
    // private reportService: ReportService,
    public constant: Constant,
    private router: Router,
    private localStorageService: LocalStorageService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private loadingScreenService: LoadingScreenService,
    private paymentService: PaymentService
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

    // this.allPage = this.data.page;
    this.documentDetail = this.data.document;
    this.searchDetail(this.documentDetail)
    // this.findPage();
    // this.save(0, this.data.head, this.data.item);
  }

  // findPage() {
  //   if (this.allPage.size > 0) {
  //     for (const [key, value] of this.allPage) {
  //       if (key === 'path') {
  //         this.pathPage = value;
  //       } else if (key === 'create') {
  //         this.createPage = value;
  //       } else if (key === 'search') {
  //         this.searchPage = value;
  //       } else if (key === 'backList') {
  //         this.backListPage = value;
  //       } else if (key === 'edit') {
  //         this.editPage = value;
  //       }
  //     }
  //   }
  // }

  searchDetail(document) {
    // this.loadingScreenService.loadingToggleStatus(true)
    this.listDocument = [];
    this.paymentService.searchDetailDocument(document.docNo).subscribe(data => {
      // this.loadingScreenService.loadingToggleStatus(false)
      const response = data as any;
      const result = response.data;
      console.log(result)
      if (result) {
        if (result.length > 0 && result.length <= 500) {
          this.listDocument = result;
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

}

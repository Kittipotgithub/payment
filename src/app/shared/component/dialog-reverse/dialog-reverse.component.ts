import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Constant } from '@shared/constant';
import { ReverseFiHead } from '@core/models/reverse-fi-head';
import { WebInfo } from '@core/models/web-info';
import { LocalStorageService } from '@core/services';

export interface DialogData {
  page: string;
  header: ReverseFiHead;
}

@Component({
  selector: 'app-dialog-reverse',
  templateUrl: './dialog-reverse.component.html',
  styleUrls: ['./dialog-reverse.component.scss']
})
export class DialogReverseComponent implements OnInit {
  listResult = [];
  listResultError = [];
  tableSucces = true;

  pathPage: string;
  createPage: string;
  searchPage: string;
  backListPage: string;
  editPage: string;
  isLoading: boolean = false;

  allPage: any;
  webInfo: WebInfo;
  constructor(
    public dialogRef: MatDialogRef<DialogReverseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    // private fiService: FiService,
    public constant: Constant,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.webInfo = this.localStorageService.getWebInfo();
  }

  ngOnInit() {
    this.allPage = this.data.page;
    this.findPage();
    const payload = {
      header: this.data.header,
      webInfo: this.localStorageService.getWebInfo()
    };
    // this.reverse(payload);
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

  // reverse(payload) {
  //   this.isLoading = true
  //   this.fiService.reverse(payload).subscribe(result => {
  //     const resultError = result.data.messages;
  //     if (result.status === 'F') {
  //       if (resultError.length > 0) {
  //         this.listResultError = resultError;
  //         this.tableSucces = false;
  //       }
  //     } else {
  //       this.tableSucces = true;
  //       if (result.data) {
  //         this.listResult.push(result.data);
  //       }
  //     }
  //     this.isLoading = false
  //   });
  // }

  onNoClick(): void {
    this.dialogRef.close({ event: 'cancel' });
  }

  searchInfo() {
    this.router.navigate([this.pathPage + '/' + this.createPage], {
      queryParams: { docNo: this.listResult[0].accDocNo, docYear: this.listResult[0].fiscYear }
    });
    this.dialogRef.close({ event: 'close' });
  }
}

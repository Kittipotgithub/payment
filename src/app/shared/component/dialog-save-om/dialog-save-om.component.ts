import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FiService } from '@core/services/fi/fi.service';
import { Constant } from '@shared/constant';
import { WebInfo } from '@core/models/web-info';
import { LocalStorageService } from '@core/services';
import { DialogExportJsonComponent } from '../dialog-export-json/dialog-export-json.component';
import { DialogExportXmlComponent } from '../dialog-export-xml/dialog-export-xml.component';

export interface DialogData {
  page: any;
  head: any;
  item: [];
  headerTable: [];
  webInfo: {};
}

@Component({
  selector: 'app-dialog-save-om',
  templateUrl: './dialog-save-om.component.html',
  styleUrls: ['./dialog-save-om.component.scss']
})
export class DialogSaveOmComponent implements OnInit {
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
  isLoading = false;
  dialog: any;
  xml: any;
  jsonString: any;
 

  constructor(
    public dialogRef: MatDialogRef<DialogSaveOmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fiService: FiService,

    public constant: Constant,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.allPage = this.data.page;
    this.findPage();
    this.save(0, this.data.head, this.data.item);
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

  save(flag: number, head, items) {
    this.isLoading = true;
    const payload = {
      header: head,
      items,
      webInfo: this.data.webInfo
    };
    if (this.pathPage === 'om03') {
      this.fiService.changeRpComplete(payload).subscribe(data => {
        const response = data as any;
        const result = response.data;
        console.log(result);
        if (result) {
          if (result.items.length > 0 && result.items !== null) {
            this.listResultPresave = result.items;
            this.isPresaveSuccess = false;
          }
        }
        this.isLoading = false;
        return data;
      });
    } else {
      this.fiService.changePaymentBlock(payload).subscribe(data => {
        const response = data as any;
        const result = response.data;
        if (result) {
          if (result.items.length > 0 && result.items !== null) {
            this.listResultPresave = result.items;
            this.isPresaveSuccess = false;
          }
        }
        this.isLoading = false;
        return data;
      });
    }
  }
  onClickExportXML() {
    // may be receieve xml data from service
    const dialogRef = this.dialog.open(DialogExportXmlComponent, {
      width: '70vw',
      data: {
        page: this.data.page,
        xml_text: this.xml
      }
    });

    dialogRef.afterClosed().subscribe(result => { });
    // this.dialogRef.close({ event: 'cancle' });
  }
  
  onClickExportJSON() {
    // may be receieve xml data from service
    const dialogRef = this.dialog.open(DialogExportJsonComponent, {
      width: '70vw',
      data: {
        page: this.data.page,
        json_text: this.jsonString
      }
    });

    dialogRef.afterClosed().subscribe(result => { });
    // this.dialogRef.close({ event: 'cancle' });
  }


  onConfirmSave() {
    // this.data.head.FLAG = 1;
    this.save(1, this.data.head, this.data.item);
  }

  onNoClick(): void {
    if (this.isSaveSuccess) {
      this.dialogRef.close({ event: 'save' });
    } else {
      this.dialogRef.close({ event: 'cancle' });
    }
  }

  


  onSearchPage(): void {
    this.router.navigate([this.pathPage + '/' + this.searchPage]);
    this.dialogRef.close();
  }
}

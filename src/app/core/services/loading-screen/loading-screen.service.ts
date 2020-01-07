import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  private _loading = false;
  isLoadingVisable = false;
  loadingVisableChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.loadingVisableChange.subscribe(value => {
      this.isLoadingVisable = value;
    });
  }

  loadingToggleStatus(flag) {
    this.loadingVisableChange.next(flag)
  }
}
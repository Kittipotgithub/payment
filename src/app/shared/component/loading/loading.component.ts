import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() isLoading: boolean;
  loading = false;
  loadingSubscription: Subscription;

  constructor() {}

  ngOnInit() {
  }
}

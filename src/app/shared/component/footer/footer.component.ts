import { Component, OnInit } from '@angular/core';
import { LoadingScreenService } from '@core/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  // appVersion = process.env.npm_package_version;
  appVersion = '0.4.162';
  isLoading: Boolean = false;
  constructor(private loadingScreenService: LoadingScreenService) {
    this.appVersion = this.appVersion;
  }

  ngOnInit() {
    this.loadingScreenService.loadingVisableChange.subscribe(value => {
      this.isLoading = value;
    });
  }

  ngAfterViewInit(): void {}
}

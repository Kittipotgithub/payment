import { UserProfile } from '@core/models/user-profile';
import { Router } from '@angular/router';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { GlobalObject } from '@shared/global-object';

@Component({
  selector: 'app-head-content',
  templateUrl: './head-content.component.html',
  styleUrls: ['./head-content.component.scss']
})
export class HeadContentComponent implements OnInit {
  userProfile: UserProfile;
  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.userProfile = this.localStorageService.getUserProfile();
    if (this.userProfile === null && this.userProfile === undefined) {
      // this.router.navigate(['/']);
    }
  }
}

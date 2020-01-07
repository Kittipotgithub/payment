import { Injectable } from '@angular/core';
import { UserProfile } from '@core/models/user-profile';
import { WebInfo } from '@core/models/web-info';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private userProfile: UserProfile;
  private webInfo: WebInfo;

  constructor(private router: Router) {}

  public getUserProfile() {
    if (this.userProfile) {
      return this.userProfile;
    } else {
      if (!sessionStorage.getItem('userProfile')) {
        this.router.navigate(['/']);
      } else {
        this.userProfile = JSON.parse(sessionStorage.getItem('userProfile'));
      }

      return this.userProfile;
    }
  }

  public setUserProfile(userProfile: UserProfile) {
    userProfile.DATELOGIN = new Date();
    sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    this.userProfile = userProfile;
  }

  public getWebInfo() {
    if (this.webInfo) {
      return this.webInfo;
    } else {
      if (!sessionStorage.getItem('webInfo')) {
        this.router.navigate(['/']);
      } else {
        this.webInfo = JSON.parse(sessionStorage.getItem('webInfo'));
      }

      return this.webInfo;
    }
  }

  public setWebInfo(webInfo: WebInfo) {
    sessionStorage.setItem('webInfo', JSON.stringify(webInfo));
    this.webInfo = webInfo;
  }
}

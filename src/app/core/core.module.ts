import { UserProfileService, ApiService, LocalStorageService } from '@core/services';
import { CacheInterceptor, ApiPrefixInterceptor, HttpCacheService } from './interceptors';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FiService } from './services/fi/fi.service';
import { WebInfoService } from './services/web-info.service';
import { SidebarService } from './services/sidebar.service';
import { LoadingScreenService } from './services/loading-screen/loading-screen.service';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  // { provide: HTTP_INTERCEPTORS, useClass: HttpCacheService, multi: true }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [httpInterceptorProviders, ApiService, UserProfileService, FiService, LocalStorageService, WebInfoService, SidebarService, LoadingScreenService]
})
export class CoreModule {}

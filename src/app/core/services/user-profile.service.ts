import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserProfile } from '@core/models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private apiService: ApiService) {}

  getOneByUsername(payload): Observable<any> {
    console.log('getOneByUsername', payload);
    return this.apiService.post('/user/login', payload).pipe(
      map(data => {
        console.log(data.message);
        return data;
      }),
      take(1)
    );
  }
}

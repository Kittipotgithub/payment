import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { FiPayment } from '@core/models/fi-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private apiService: ApiService) { }

  searchPaymentBlock(payload): Observable<any> {
    return this.apiService.post('/payment/search', payload).pipe(
      map(data => {
        console.log(data);
        return data;
      })
    );
  }
  searchDetailDocument(textSearch): Observable<FiPayment> {
    return this.apiService.get('/payment/searchDetail/' + textSearch).pipe(
      map(data => {
        return data;
      })
    );
  }


}

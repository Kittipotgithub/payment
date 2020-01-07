import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}${path}`, { params }).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}${path}`, body).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}${path}`, body).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}${path}`).pipe(catchError(this.formatErrors));
  }

  report(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}${path}`, body, {
        responseType: 'arraybuffer'
      })
      .pipe(catchError(this.formatErrors));
  }
}

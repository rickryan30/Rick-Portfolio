import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Sendmail } from '../models/sendmail.model';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {

  private apiURL = "https://app-27c5ca7f-862f-40d7-a88f-0bece4925628.cleverapps.io/api/sendmail.php";
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }
  
  sendmail(mailername:Sendmail, maileremail: Sendmail, mailarea:Sendmail): Observable<Sendmail> {
    return this.httpClient.post<Sendmail>(this.apiURL, JSON.stringify({mailername,maileremail,mailarea}), { headers: this.httpHeaders})
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}

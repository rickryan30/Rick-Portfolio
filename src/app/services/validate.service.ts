import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  private apiURL = "https://php-jwt.cleverapps.io/";
  // private apiURL = "http://localhost/php-jwt/";

  constructor(private httpClient: HttpClient) { }

  getToken(jwt: any): Observable<any> {
    return this.httpClient.post<any>(this.apiURL, {jwt})
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

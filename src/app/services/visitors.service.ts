import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Visitors } from '../models/visitors.model';
 
@Injectable({
  providedIn: 'root'
})
export class VisitorsService {

  private apiURL = "https://php-jwt.netlify.app/";
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  find(user_ip: any): Observable<Visitors> {
    return this.httpClient.get<Visitors>(this.apiURL + 'api/visitors/get.php?user_ip=' + user_ip, { headers: this.httpHeaders})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Visitors[]> {
    return this.httpClient.get<Visitors[]>(this.apiURL + 'api/visitors/get.php')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  create(data: Visitors): Observable<Visitors> {
    return this.httpClient.post<Visitors>(this.apiURL + 'api/visitors/insert_visitor.php', JSON.stringify(data), { headers: this.httpHeaders})
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Visitors } from '../models/visitors.model';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {

  REST_API: string = 'https://medillorickryan.000webhostapp.com/api/visitors';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  //get all
  getVisitors() {
    return this.httpClient.get(`${this.REST_API}` + `/get.php`);
  }
  
  // Get single 
  getVisitorsUserIP(user_ip:any): Observable<any> {
    let API_URL = `${this.REST_API}/get.php?user_ip=${user_ip}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders})
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.errorHandler)
      )
  }
 
  // Add
  addVisitors(data: Visitors): Observable<any> {
    let API_URL = `${this.REST_API}/insert_visitor.php`;
    return this.httpClient.post<Visitors>(API_URL, data)
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

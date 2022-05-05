import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Visitors } from '../models/visitors.model';
 
@Injectable({
  providedIn: 'root'
})
export class VisitorsService {
  status?: [] | any;
  visitorStatus: Visitors;
 
  private apiURL = "https://php-jwt.cleverapps.io/";
  // private apiURL = "http://localhost/php-jwt/";
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
 
  constructor(private httpClient: HttpClient) { 
    this.visitorStatus = new Visitors();
    this.visitorStatus.status = {"status":"Failed"};
    this.status = this.visitorStatus.status;
  }

  find(user_ip: any): Observable<Visitors> {
    return this.httpClient.get<Visitors>(this.apiURL + 'visitors/get.php?user_ip=' + user_ip, { headers: this.httpHeaders})
    .pipe(
      map((data:Visitors) => {
          if (data) {
              return data;
          } else {
              return this.status; // Although you're stating to not want to return an empty array, in my opinion, an empty array would fit your case, since you're planning to return Observable<result[]>
          }
      })
    );
  }

  getData(): Observable<Visitors[]> {
    return this.httpClient.get<Visitors[]>(this.apiURL + 'visitors/get.php')
    .pipe(
        map((data:Visitors[]) => {
            if (data) {
                return data;
            } else {
                return this.status; // Although you're stating to not want to return an empty array, in my opinion, an empty array would fit your case, since you're planning to return Observable<result[]>
            }
        })
    );
}
  
  create(data: Visitors): Observable<Visitors> {
    return this.httpClient.post<Visitors>(this.apiURL + 'visitors/insert_visitor.php', JSON.stringify(data), { headers: this.httpHeaders})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: any, data: Visitors): Observable<Visitors> {
    return this.httpClient.put<Visitors>(this.apiURL + 'visitors/update_visitor.php?id=' + id, JSON.stringify(data), { headers: this.httpHeaders})
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

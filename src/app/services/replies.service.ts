import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Replies } from '../models/replies.model';

@Injectable({
  providedIn: 'root'
})
export class RepliesService {

  private apiURL = "https://php-jwt.netlify.app/";
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }
find(user_ip: any): Observable<Replies> {
    return this.httpClient.get<Replies>(this.apiURL + 'api/testimonial-replies/get.php?user_ip=' + user_ip, { headers: this.httpHeaders})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Replies[]> {
    return this.httpClient.get<Replies[]>(this.apiURL + 'api/testimonial-replies/get.php')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  create(data: Replies): Observable<Replies> {
    return this.httpClient.post<Replies>(this.apiURL + 'api/testimonial-replies/insert_reply.php', JSON.stringify(data), { headers: this.httpHeaders})
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

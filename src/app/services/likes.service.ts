import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Likes } from '../models/likes.model';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private apiURL = "https://php-jwt.netlify.app/";
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  find(user_ip: any): Observable<Likes> {
    return this.httpClient.get<Likes>(this.apiURL + 'api/likes/get.php?user_ip=' + user_ip, { headers: this.httpHeaders})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Likes[]> {
    return this.httpClient.get<Likes[]>(this.apiURL + 'api/likes/get.php')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  create(data: Likes): Observable<Likes> {
    return this.httpClient.post<Likes>(this.apiURL + 'api/likes/insert_likes.php', JSON.stringify(data), { headers: this.httpHeaders})
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

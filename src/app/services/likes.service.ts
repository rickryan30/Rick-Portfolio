import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Likes } from '../models/likes.model';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  
  REST_API: string = 'https://kcirnayr.000webhostapp.com/api/likes';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  //get all
  getLikes() {
    return this.httpClient.get(`${this.REST_API}` + `/get.php`);
  }
  
  // Get single 
  getLikesUserIP(user_ip:any): Observable<any> {
    let API_URL = `${this.REST_API}/get.php?user_ip=${user_ip}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders})
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.errorHandler)
      )
  }
 

  // Add
  addLikes(data: Likes): Observable<any> {
    let API_URL = `${this.REST_API}/insert_likes.php`;
    return this.httpClient.post<Likes>(API_URL, data)
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

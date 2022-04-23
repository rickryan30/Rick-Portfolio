import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Replies } from '../models/replies.model';

@Injectable({
  providedIn: 'root'
})
export class RepliesService {

  REST_API: string = 'https://kcirnayr.000webhostapp.com/api/testimonial-replies';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  //get all
  getReplies() {
    return this.httpClient.get(`${this.REST_API}` + `/get.php`);
  }
  
  // Get single 
  getReplyTid(tid:any): Observable<any> {
    let API_URL = `${this.REST_API}/get.php?tid=${tid}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders})
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.errorHandler)
      )
  }
 

  // Add
  addReplies(data: Replies): Observable<any> {
    let API_URL = `${this.REST_API}/insert_reply.php`;
    return this.httpClient.post<Replies>(API_URL, data)
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

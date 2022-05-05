import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Replies } from '../models/replies.model';

@Injectable({
  providedIn: 'root'
})
export class RepliesService {
  status?: [] | any;
  replyStatus: Replies;

  private apiURL = "https://php-jwt.cleverapps.io/";
  // private apiURL = "http://localhost/php-jwt/";

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
    this.replyStatus = new Replies();
    this.replyStatus.status = {"status":"Failed"};
    this.status = this.replyStatus.status;
  }


find(user_ip: any): Observable<Replies> {
    return this.httpClient.get<Replies>(this.apiURL + 'testimonial-replies/get.php?user_ip=' + user_ip, { headers: this.httpHeaders})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getData(): Observable<Replies[]> {
    return this.httpClient.get<Replies[]>(this.apiURL + 'testimonial-replies/get.php')
    .pipe(
        map((data:Replies[]) => {
            if (data) {
                return data;
            } else {
                return this.status; // Although you're stating to not want to return an empty array, in my opinion, an empty array would fit your case, since you're planning to return Observable<result[]>
            }
        })
    );
}
  
  create(data: Replies): Observable<Replies> {
    return this.httpClient.post<Replies>(this.apiURL + 'testimonial-replies/insert_reply.php', JSON.stringify(data), { headers: this.httpHeaders})
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

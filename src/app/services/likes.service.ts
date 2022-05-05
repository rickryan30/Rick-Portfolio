import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Likes } from '../models/likes.model';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  status?: [] | any;
  likeStatus: Likes;
  
  private apiURL = "https://php-jwt.cleverapps.io/";
  // private apiURL = "http://localhost/php-jwt/";

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor( private httpClient: HttpClient) {
    this.likeStatus = new Likes();
    this.likeStatus.status = {"status":"Failed"};
    this.status = this.likeStatus.status;
   }

  find(user_ip: any): Observable<Likes> {
    return this.httpClient.get<Likes>(this.apiURL + 'likes/get.php?user_ip=' + user_ip, { headers: this.httpHeaders})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getData(): Observable<Likes[]> {
    return this.httpClient.get<Likes[]>(this.apiURL + 'likes/get.php')
    .pipe(
        map((data:Likes[]) => {
            if (data) {
                return data;
            } else {
                return this.status; // Although you're stating to not want to return an empty array, in my opinion, an empty array would fit your case, since you're planning to return Observable<result[]>
            }
        })
    );
}
  
  create(data: Likes): Observable<Likes> {
    return this.httpClient.post<Likes>(this.apiURL + 'likes/insert_likes.php', JSON.stringify(data), { headers: this.httpHeaders})
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

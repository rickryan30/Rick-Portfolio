import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { map, Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Testimonials } from '../models/testimonials.model';


@Injectable({
  providedIn: 'root'
}) 
export class TestimonialsService {

  private apiURL = "https://app-27c5ca7f-862f-40d7-a88f-0bece4925628.cleverapps.io/";

  // private apiURL = "http://localhost/php-jwt-example/";

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json'); 

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Testimonials[]> {
    return this.httpClient.get<Testimonials[]>(this.apiURL + 'api/testimonials/get.php')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  create(data: Testimonials): Observable<Testimonials> {
    return this.httpClient.post<Testimonials>(this.apiURL + 'api/testimonials/insert_testimonial.php', JSON.stringify(data), { headers: this.httpHeaders})
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

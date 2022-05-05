import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Testimonials } from '../models/testimonials.model';


@Injectable({
  providedIn: 'root'
}) 
export class TestimonialsService {
  status?: [] | any;
  testimonialStatus: Testimonials;

  private apiURL = "https://php-jwt.cleverapps.io/";
  // private apiURL = "http://localhost/php-jwt/";

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json'); 

  constructor(private httpClient: HttpClient) { 
    this.testimonialStatus = new Testimonials();
    this.testimonialStatus.status = {"status":"Failed"};
    this.status = this.testimonialStatus.status;
  }

  getData(): Observable<Testimonials[]> {
    return this.httpClient.get<Testimonials[]>(this.apiURL + 'testimonials/get.php')
    .pipe(
        map((data:Testimonials[]) => {
            if (data) {
                return data;
            } else {
                return this.status; // Although you're stating to not want to return an empty array, in my opinion, an empty array would fit your case, since you're planning to return Observable<result[]>
            }
        })
    );
}
  
  create(data: Testimonials): Observable<Testimonials> {
    return this.httpClient.post<Testimonials>(this.apiURL + 'testimonials/insert_testimonial.php', JSON.stringify(data), { headers: this.httpHeaders})
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

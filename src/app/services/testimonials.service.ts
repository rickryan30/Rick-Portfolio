import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, Observable, observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Testimonials } from '../models/testimonials.model';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  REST_API: string = 'https://medillorickryan.000webhostapp.com/api/testimonials';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  //get all
  geTesti() {
    return this.httpClient.get(`${this.REST_API}` + `/get.php`);
  }
  
  // Get single 
  getTestId(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/get.php?id=${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders})
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.errorHandler)
      )
  }
 

  // Add
  addTesti(data: Testimonials): Observable<any> {
    let API_URL = `${this.REST_API}/insert_testimonial.php`;
    return this.httpClient.post<Testimonials>(API_URL, data)
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

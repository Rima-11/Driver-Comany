import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private base_path = environment.BASE_URL+'/users';
  
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log(error)
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error)
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getItem(id): Observable<Profile> {
     return this.http
      .get<Profile>(this.base_path + '/' + id)
      .pipe(
       retry(2),
        catchError(this.handleError)
      )
 }

  // Get Profile data
  getList(): Observable<Profile> {
    return this.http
      .get<Profile>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

 // Update item by id
  updateItem(id, item): Observable<Profile> {
    console.log(id,item);
    return this.http
      .put<Profile>(this.base_path + '/' + id, item , this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}

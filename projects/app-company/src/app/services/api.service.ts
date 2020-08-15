import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Drivers } from 'src/app/models/drivers';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UsersCompany } from '../models/users-company';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
   // API path
   base_path = 'http://localhost:3000/drivers';
   base_path1 = 'http://localhost:3000/usersCompany';
   
  constructor(private http: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

// Handle API errors
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};



// Create a new item
createItem(item): Observable<Drivers> {
  return this.http
    .post<Drivers>(this.base_path, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single driverdata by ID
getItem(id): Observable<Drivers> {
  return this.http
    .get<Drivers>(this.base_path + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get driver data
getList(): Observable<Drivers> {
  return this.http
    .get<Drivers>(this.base_path)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Update item by id
updateItem(id, item): Observable<Drivers> {
  return this.http
    .put<Drivers>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id) {
  return this.http
    .delete<Drivers>(this.base_path + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

//create usercompany 
createUsers(item): Observable<UsersCompany>{
  return this.http
    .post<UsersCompany>(this.base_path1, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )

}

//get users company data
getusers(id): Observable<UsersCompany> {
  return this.http
    .get<UsersCompany>(this.base_path1 + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get users company data
getListusers(): Observable<UsersCompany> {
  return this.http
    .get<UsersCompany>(this.base_path1)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
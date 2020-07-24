// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Mobilemoney } from '../models/mobilemoney';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Paypal } from '../models/paypal';
import { CreditCard } from '../models/credit-card';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  // tslint:disable-next-line: variable-name
  base_path = 'http://localhost:3000/mobilemoneys';
  // tslint:disable-next-line: variable-name
  base_path1 = 'http://localhost:3000/paypals';
  // tslint:disable-next-line: variable-name
  base_path2 = 'http://localhost:3000/creditCards';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

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
  }


  // Create a new item
  createItem(item): Observable<Mobilemoney> {
    return this.http
      .post<Mobilemoney>(this.base_path, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

 // Get single Mobilemoney data by ID
  getItemMobileMoney(id): Observable<Mobilemoney> {
    return this.http
      .get<Mobilemoney>(this.base_path + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get Mobilemoney data
  getListMobileMoney(): Observable<Mobilemoney> {
    return this.http
      .get<Mobilemoney>(this.base_path)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Update item by id
  updateItem(id, item): Observable<Mobilemoney> {
    return this.http
      .put<Mobilemoney>(this.base_path + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Delete item by id
  deleteMobileMoney(id) {
    return this.http
      .delete<Mobilemoney>(this.base_path + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  // ****************************************paypa************************************************/
// Create a new item
// tslint:disable-next-line: adjacent-overload-signatures
createItemPaypal(item: Paypal): Observable<Paypal> {
  return this.http
    .post<Paypal>(this.base_path1, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get single Mobilemoney data by ID
// tslint:disable-next-line: adjacent-overload-signatures
getItemPaypal(id): Observable<Paypal> {
  return this.http
    .get<Paypal>(this.base_path1 + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get Mobilemoney data
// tslint:disable-next-line: adjacent-overload-signatures
getListPaypal(): Observable<Paypal> {
  return this.http
    .get<Paypal>(this.base_path1)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Update item by id
// tslint:disable-next-line: adjacent-overload-signatures
updateItemPaypal(id: string, item: any): Observable<Paypal> {
  return this.http
    .put<Paypal>(this.base_path1 + '/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Delete item by id
// tslint:disable-next-line: adjacent-overload-signatures
deleteItemPaypal(id: string) {
  return this.http
    .delete<Paypal>(this.base_path1 + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}
  // ****************************************creditcard************************************************/
// Create a new item
// tslint:disable-next-line: adjacent-overload-signatures
createItemCreditCard(item: CreditCard): Observable<CreditCard> {
  return this.http
    .post<CreditCard>(this.base_path2, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get single Mobilemoney data by ID
// tslint:disable-next-line: adjacent-overload-signatures
getItemCreditCard(id): Observable<CreditCard> {
  return this.http
    .get<CreditCard>(this.base_path2 + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Get Mobilemoney data
// tslint:disable-next-line: adjacent-overload-signatures
getListCreditCard(): Observable<CreditCard> {
  return this.http
    .get<CreditCard>(this.base_path2)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Update item by id
// tslint:disable-next-line: adjacent-overload-signatures
updateItemCreditCard(id: string, item: any): Observable<CreditCard> {
  return this.http
    .put<CreditCard>(this.base_path2 + '/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}

// Delete item by id
// tslint:disable-next-line: adjacent-overload-signatures
deleteCreditCard(id: string) {
  return this.http
    .delete<CreditCard>(this.base_path2 + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    );
}
}

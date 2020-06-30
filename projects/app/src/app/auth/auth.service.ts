import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:3001';
  authSubject  =  new  BehaviorSubject(false);

   rmCheck = document.getElementById("rememberMe");
    phoneInput = document.getElementById("phone");
    passwordInput = document.getElementById("password");
  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }


  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/auth/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          await this.storage.set("REMEMBER_ME" , res.user.remember);
          if (localStorage.checkbox && localStorage.checkbox !== "") {
           this.rmCheck.setAttribute("checked", "checked");
           // this.phoneInput.value = localStorage.phone;
          } else {
            this.rmCheck.removeAttribute("checked");
           // this.phoneInput.value = "";
          }

          this.authSubject.next(true);}

      })
    );
  }
  // lsRememberMe() {
  //   // if (this.rmCheck.checked && this.phoneInput.value !== "") {
  //   //   localStorage.phone = this.phoneInput.value;
  //   //   localStorage.checkbox = this.rmCheck.value;
  //   } else {
  //     localStorage.phone = "";
  //     localStorage.checkbox = "";
  //   }
  // }
  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}

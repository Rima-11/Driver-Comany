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

  constructor(private  httpClient:  HttpClient, public storage: Storage) { }
  
  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/auth/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        console.log(res);
console.log(this.storage);
        if (res.user) {
          console.log(res.user);
          console.log(this.storage);
          await this.storage.set("access_token", res.user.access_token);
          await this.storage.set("expires_in", res.user.expires_in);
          await this.storage.set("remember" , res.user.remember);
          await this.storage.set("phone" , res.user.phone);
          this.authSubject.next(true);}

      })
    );
    }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}

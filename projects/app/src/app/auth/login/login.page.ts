import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';

import { Storage } from  '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private storage: Storage) { }

  loginForm: FormGroup;
  isSubmitted  =  false;
  errorMessage = '';
  isLoginFailed = false;
  phone: number;
  remember:boolean;
  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      phone :['',Validators.compose([Validators.minLength(8),
        Validators.required,])],
        password :['',Validators.compose([Validators.required])],
        remember :['']
    });
 console.log(this.storage);
 this.storage.get("phone").then((valeur ) => {
  // this.phone= valeur;
  this.loginForm.get("phone").setValue(valeur);
   console.log('Ma variable contient ', this.phone );
   });
   this.storage.get("remember").then((valeur ) => {
     this.remember = valeur;
     console.log('Ma variable contient ', this.remember );
     });
  }

get formControls() { return this.loginForm.controls; }

login(form){
  console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
  this.authService.login(this.loginForm.value).subscribe((res)=>{
    console.log(this.storage);
    console.log(this.authService.isLoggedIn());
    this.router.navigateByUrl('home');
  },err => {
    this.errorMessage = err.error.message;
    console.log(this.errorMessage);
    this.isLoginFailed = true;
  });
}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { User } from  '../user';
import { AuthService } from  '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }
  loginForm: FormGroup;
  isSubmitted  =  false;
  errorMessage = '';
  isLoginFailed = false;

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      phone :['',Validators.compose([Validators.minLength(8),
        Validators.required,])],
        password :['',Validators.compose([Validators.required])],
        remember :['']
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
    this.router.navigateByUrl('home');
  },err => {
    this.errorMessage = err.error.message;
    console.log(this.errorMessage);
    this.isLoginFailed = true;
  });
}
}

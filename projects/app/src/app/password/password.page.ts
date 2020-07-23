import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})


export class PasswordPage implements OnInit {
  profilesData: any;
  user: Profile;
  password:string;
  passwordForm: any;
  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute,public formBuilder: FormBuilder,private http:HttpClient, private router: Router) { 
    this.user = new Profile;
  }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      newPassword:['', Validators.compose([Validators.required])],
    confirmpassword:['',[Validators.required]]
    })
  }
 verifyPassword(){
if(this.passwordForm.password.value === this.user.password)
{
console.log(this.passwordForm.password.value);
console.log(this.user.password)
}
 }
}

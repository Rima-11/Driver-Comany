import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
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
  passwordForm: FormGroup;
  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute,public formBuilder: FormBuilder,private http:HttpClient, private router: Router) { 
    this.user = new Profile;
    this.profilesData = [];
  }
  verif:true;
  errorMessage="";
  submitAttempt: boolean;
  id: number;
  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      confirmpassword:['',[Validators.required,this.equalto('newPassword')]]
    })
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    let input = control.value;
    let isValid=control.root.value[field_name]==input
    if(!isValid)
    return { 'equalTo': {isValid} }
    else
    return null;
    };
    }

  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not 
    // called due to view persistence in Ionic
    console.log(2)
    this.id = this.activatedRoute.snapshot.params["id"] ?? 1;
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.user = response;
      console.log(this.user)
    })
  }

   verifyPassword(value:string) {
     if(this.user.password === value)
     {
    console.log("false");
     }
     else{
      this.errorMessage = "not the same password";
       console.log(this.errorMessage);
     }
   }

  update() {
    let url="http://localhost:3000/users";
    console.log(this.passwordForm.value);
    this.http.patch(url+"/" +this.id ,this.passwordForm.value.confirmpassword,this.passwordForm.value.newPassword).toPromise().then((data:any)=>{
      console.log(data)
      // this.router.navigate(['/home']);

    });
  }

  onSubmit() {
    // To save the passwordForm values
    // console.log('this.passwordForm.value', this.passwordForm.value);
    console.log('input',this.passwordForm.value.password);
      console.log('db',this.user.password);

  }
}

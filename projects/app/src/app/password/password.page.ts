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
  passwordForm: FormGroup;
  user: Profile;
  errorMessage="";
  submitAttempt: boolean;
  id: number;
  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute,public formBuilder: FormBuilder,private http:HttpClient, private router: Router) { 
    this.profilesData = [];
    this.user= new Profile;
  }
 
  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      oldpassword: ['',[Validators.required]],
      password: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      confirmPassword:['',[Validators.required,this.equalto('password')]]
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
     if(this.user.password === this.passwordForm.value.oldpassword)
     {
      console.log('yes');
      this.errorMessage="";
     }
     else{
      this.errorMessage = "not the same password";
      console.log(this.passwordForm.value.oldpassword)
     }
   }

  update() {
    let url="http://localhost:3000/users";
    console.log(this.passwordForm.value);
    this.http.patch(url+"/"+this.id ,this.passwordForm.value).toPromise().then((data:any)=>{
      console.log(data)
       this.router.navigate(['/settings']);

    });
  }

  onSubmit() {
    // To save the passwordForm values
    // console.log('this.passwordForm.value', this.passwordForm.value);
    console.log('input',this.passwordForm.value.oldpassword);
      console.log('db',this.user.password);

  }
}

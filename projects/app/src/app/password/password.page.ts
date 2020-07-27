import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})

export class PasswordPage implements OnInit {
  private base_path = `${environment.API_ENTRYPOINT}`;
  profilesData: any;
  password:string;
  passwordForm: FormGroup;
  constructor(public apiService: ApiService, public activatedRoute: ActivatedRoute,public formBuilder: FormBuilder,private http:HttpClient, private router: Router) { 
    this.profilesData = [];
  }
  verif:true;
  errorMessage="";
  submitAttempt: boolean;
  id: number;
  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
     
      password: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      Confirmpassword:['',[Validators.required,this.equalto('password')]]
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
      this.profilesData = response;
      console.log(this.profilesData)
    })
  }

   verifyPassword(value:string) {
     if(this.profilesData.password === value)
     {
    console.log("false");
     }
     else{
      this.errorMessage = "not the same password";
       console.log(this.errorMessage);
     }
   }

  update() {
    console.log(this.passwordForm.value);
    this.http.patch(`${this.base_path}/users/${this.id }`, this.passwordForm.value).toPromise().then((data:any)=>{
      console.log(data)
       this.router.navigate(['/settings']);

    });
  }

  onSubmit() {
    // To save the passwordForm values
    // console.log('this.passwordForm.value', this.passwordForm.value);
    console.log('input',this.passwordForm.value.oldpassword);
      console.log('db',this.profilesData.password);

  }
}

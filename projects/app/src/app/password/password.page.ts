import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Storage } from  '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})

export class PasswordPage implements OnInit {
  private base_path = `${environment.API_ENTRYPOINT}`;
  passwordForm: FormGroup;
  user: Profile;
  errorMessage="";
  submitAttempt: boolean;
  id: number;
  constructor(public toastController: ToastController, private storage: Storage, public apiService: ApiService, public activatedRoute: ActivatedRoute,public formBuilder: FormBuilder,private http:HttpClient, private router: Router) { 
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
   this.storage.get("id").then((valeur ) => {
    console.log(valeur);
    this.id=parseInt(valeur)
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.user = response;
      console.log(this.user)
    })
      });
  }

   verifyPassword(value:string) {
     console.log(this.user.password);
      console.log(this.passwordForm.value.oldpassword);
     
     if(this.user.password === this.passwordForm.value.oldpassword)
     {
      console.log('yes');
      this.errorMessage="";
     }
     else{
      this.errorMessage = "Not the same password";
      console.log(this.passwordForm.value.oldpassword)
     }
   }

  update() {
    console.log(this.passwordForm.value);
    this.http.patch(`${this.base_path}/users/${this.id }`, this.passwordForm.value).toPromise().then((data:any)=>{
      console.log(data)
       this.router.navigate(['/settings']);

    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your password have been saved.',
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
    // To save the passwordForm values
    // console.log('this.passwordForm.value', this.passwordForm.value);
    console.log('input',this.passwordForm.value.oldpassword);
      console.log('db',this.user.password);

  }
}

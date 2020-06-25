import { Component, OnInit,ViewChild, ViewChildren, QueryList } from '@angular/core';
import {HttpClient} from'@angular/common/http';
import {IonSlides, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Validators,ValidatorFn, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  @ViewChild('signupSlider') signupSlider;
  submitAttempt: boolean;
  slideOneForm: any;
  slides: any;
  store: any;
  code=123;
  phoneData={
    phone:''
  };
 ngOnInit() {
  
  }
  constructor(public nav: NavController,public formBuilder: FormBuilder,private http:HttpClient,private router: Router) {
    this.slideOneForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ['',Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        phone:['',Validators.compose([Validators.required])],
        accountType:['',Validators.compose([
          Validators.required])],
        code:['',Validators.compose([
            Validators.required])],
        zip :['',Validators.compose([
          Validators.required])],
        town:['',Validators.compose([
          Validators.required])],
        country:['',Validators.compose([
          Validators.required])],
        password: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
        Confirmpassword:['',[Validators.required,this.equalto('password')]]
        // person:['',]
    });
}

//password 

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

//previous next

next(){
  this.signupSlider.slideNext();
}
checkValue(event){ 
  console.log(event.detail.value);
}
prev(){
  this.signupSlider.slidePrev();
}

//create account
  save(){
    this.submitAttempt = true;
    if(!this.slideOneForm.valid){
        this.signupSlider.slideTo(0);
    }
    else {
       let url="http://localhost:3000/users";
  this.http.post(url,this.slideOneForm.value).toPromise().then((data:any)=>{
    console.log(data);
  });
  //console.log(this.slideOneForm.value.phone);
    }   
}

//verify phone

verifyPhone()
{
  let url="http://localhost:3000/users";
  this.http.get(url)
  .subscribe((data) => {
  for(let i=0;i< Object.keys(data).length; i++ )
  {
   var phones=data[i].phone;
   if (phones==this.slideOneForm.value.phone)
   {
    this.router.navigate(['/signup'])
   }
   else {
    this.signupSlider.slideNext();
   }   
  }
});
}

//verify code 

verifyCode() {
  if (this.code==this.slideOneForm.value.code) return false ;
           return true ;
}
}

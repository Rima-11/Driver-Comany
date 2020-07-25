import { Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from'@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {Validators,ValidatorFn, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  @ViewChild('resetSlider') resetSlider;
  submitAttempt: boolean;
  slideOneForm: any;
  slides: any;
  store: any;
  code : string ="123";
  empty:boolean ;
  disabled : boolean;
  phoneData={
    phone:''
  };
  passwordData={
    password:''
  };
   id='';
   errorMessage = '';

  constructor(public formBuilder: FormBuilder,private http:HttpClient, private router: Router) {}

 userData: any = {};
  ngOnInit() {
    this.slideOneForm = this.formBuilder.group({
      phone:['',Validators.compose([Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')])],
      code:['',Validators.compose([ Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')])],

      password: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      confirmPassword:['',[Validators.required,this.equalto('password')]]
    });

  }
  get formControls() { return this.slideOneForm.controls; }

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

next($event? : any){
  const value = $event.target|| $event.srcElement || $event.currentTarget;
  const idAttribute = value.attributes.id;
  if (idAttribute?.nodeValue === "phone") {
   this.verifyPhone();
  }
  else {
    this.resetSlider.slideNext();
  }
}
checkValue(event){
  console.log(event.detail.value);
}
prev(){
  this.resetSlider.slidePrev();
}
 update() {
    this.submitAttempt = true;
  if(!this.slideOneForm.valid){
      this.resetSlider.slideTo(0);
  }
  else {
    let url="http://localhost:3000/users";
    console.log(this.slideOneForm.value);
    this.http.patch(url + "/" + this.id ,this.slideOneForm.value).toPromise().then((data:any)=>{

      this.router.navigate(['/login']);

    });
}
 }
//verify phone

verifyPhone()
{
let url="http://localhost:3000/users";
const phone = this.slideOneForm.value.phone;
this.http.get(url + "?phone=" + phone)
.subscribe((data:Array<any>) => {
if (data.length)
{
  console.log(data);
  this.id=data[0].id;

  this.verifyCode(this.slideOneForm.value.code);
this.resetSlider.slideNext();
} else {
  this.errorMessage = "Phone does not exist!";
  console.log(this.errorMessage);
}
});
}
verifPhone() {
if (this.slideOneForm.value.phone.length === 0)
{
return true ;
}
else {
 return false;
}
}
//verify code

  verifyCode(value:string) {
  if (this.code === value) {
   this.disabled = false ;
  }
  else {
    this.disabled = true ;
  }
}
}

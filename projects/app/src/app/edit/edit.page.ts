import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Profile } from '../models/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from  '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { FormGroup, Validators } from '@angular/forms'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  user: Profile;
  editForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private router: Router, public toastController: ToastController, private storage: Storage, public apiService: ApiService, public activatedRoute: ActivatedRoute) {  
   this.user = new Profile;
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      email: ['',[Validators.required]],
      phone: ['',[Validators.required]]
    })

    console.log(2)
    //get item details using id
   this.storage.get("id").then((valeur ) => {
    console.log(valeur);
    const id=parseInt(valeur)
    this.apiService.getItem(id).subscribe({
      next: (response) => { this.user = response;
      console.log(this.user);
      this.editForm.get('firstname').setValue(response.firstname,{onlySelf: true})
      this.editForm.get('lastname').setValue(response.lastname,{onlySelf: true})
      this.editForm.get('email').setValue(response.email,{onlySelf: true})
      this.editForm.get('phone').setValue(response.phone,{onlySelf: true})
      },
      error: error => console.log(error)
    })
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your information have been saved.',
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
    // To save the passwordForm values
    // console.log('this.passwordForm.value', this.passwordForm.value);
    console.log('input',this.editForm.value);
    this.user.firstname=this.editForm.get('firstname').value;
    this.user.lastname=this.editForm.get('lastname').value;
    this.user.email=this.editForm.get('email').value;
    this.user.phone=this.editForm.get('phone').value;

      console.log('db',this.user);
     //Update item by taking id and updated data object
      this.apiService.updateItem(this.user.id, this.user).subscribe(data => {
       console.log(data);
       this.presentToast();
       this.router.navigate(['/settings']);
      })
  } 
}

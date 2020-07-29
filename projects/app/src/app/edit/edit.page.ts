import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Profile } from '../models/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from  '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  user: Profile;

  constructor( private router: Router, public toastController: ToastController, private storage: Storage, public apiService: ApiService, public activatedRoute: ActivatedRoute) {  
   this.user = new Profile;
  }

  ngOnInit() {
    console.log(2)
    //get item details using id
   this.storage.get("id").then((valeur ) => {
    console.log(valeur);
    const id=parseInt(valeur)
    this.apiService.getItem(id).subscribe(response => {
      console.log(response);
      this.user = response;
      console.log(this.user)
    })
      });
  }

  update(userUpdated : Profile) {
    console.log(userUpdated)
    //Update item by taking id and updated data object
    this.apiService.updateItem(userUpdated.id, userUpdated).subscribe(data => {
     console.log(data);
     this.router.navigate(['/settings']);
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your information have been saved.',
      duration: 2000
    });
    toast.present();
  }

    
}

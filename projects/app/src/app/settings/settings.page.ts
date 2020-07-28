import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: Profile;
   
  constructor(
    public apiService: ApiService, public activatedRoute: ActivatedRoute,private storage: Storage
  ) {
     this.user = new Profile;
  }

 ngOnInit() {
  
  }

  ionViewWillEnter() {
    console.log(this.storage);
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
  

}

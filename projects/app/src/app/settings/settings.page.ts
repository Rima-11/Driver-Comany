import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Storage } from  '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  profilesData: any;

  constructor(
    public apiService: ApiService, public activatedRoute: ActivatedRoute,private storage: Storage
  ) {
    this.profilesData = [];
  }

  ngOnInit() {
        console.log(this.storage);
    this.storage.get("firstname").then((valeur ) => {
    console.log(valeur);
     this.firstname = valeur;
      });
        this.storage.get("lastname").then((valeur ) => {
    console.log(valeur);
     this.lastname = valeur;
      });
        this.storage.get("phone").then((valeur ) => {
    console.log(valeur);
     this.phone = valeur;
      });
        this.storage.get("email").then((valeur ) => {
    console.log(valeur);
     this.email = valeur;
      });
  }

  ionViewWillEnter() {

  }
  

}

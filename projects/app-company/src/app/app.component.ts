import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './services/api.service';

import { UsersCompany } from './models/users-company';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  id: number;
  usrcom: UsersCompany;
  firstname: string;
  public appPages = [
    {
      title: 'Driver management',
      url: './driver-list',
      icon: 'person'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    }
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public acitvatedRoute: ActivatedRoute,
    private service: ApiService,
    private storage: Storage

  ) {
    this.initializeApp();
    this.storage.set("firstname","rim");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ionViewWillEnter() {
    console.log(this.storage);
     
  }
  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    if (this.acitvatedRoute.snapshot.params["id"]) {
      this.id = this.acitvatedRoute.snapshot.params["id"];
    }
    this.storage.get("firstname").then((valeur ) => {
      this.firstname = valeur;
    });
    

   //get item details using id
    this.service.getusers(this.id).subscribe(response => {
      console.log("msg", this.id);
      this.usrcom= response;
    })
  }
}

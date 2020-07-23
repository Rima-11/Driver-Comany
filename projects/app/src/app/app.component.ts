import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from  '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Courses',
      url: '/folder/courses',
      icon: 'car'
    },
    {
      title: 'Payment',
      url: '/payment',
      icon: 'card'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: '/folder/logout',
      icon: 'exit'
    }
  ];
  firstname : string;
  lastname : string;
  town: string;
  country: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    console.log(this.storage);
    this.storage.get("firstname").then((valeur ) => {
    console.log(valeur);
     this.firstname = valeur;
      });
      console.log(this.storage);
      this.storage.get("lastname").then((valeur ) => {
      console.log(valeur);
       this.lastname = valeur;
        });
        console.log(this.storage);
        this.storage.get("town").then((valeur ) => {
        console.log(valeur);
         this.town = valeur;
          });
        console.log(this.storage);
        this.storage.get("country").then((valeur ) => {
        console.log(valeur);
         this.country = valeur;
          });

  }
}

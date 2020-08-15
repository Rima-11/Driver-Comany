import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { DriverListPage } from '../driver-list/driver-list.page';
import { Drivers } from '../models/drivers';

import { Button } from 'protractor';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {
  data: Drivers

  constructor( public apiService: ApiService,
    public router: Router, private alertCtrl: AlertController
    ) { 
      this.data = new Drivers();
  }
 
 
  ngOnInit() {
   
  }
 
  
  save(){ this.apiService.createItem(this.data).subscribe(async (Response) => { 
     let alert = await this.alertCtrl.create({
    header: "",
    subHeader: "",
    message: "Driver added!",
    buttons: [
      {
        text: "Great",
        handler:() =>{
  
        }
      }
    ]
  });
  
  alert.present();
  
   });

  }

}


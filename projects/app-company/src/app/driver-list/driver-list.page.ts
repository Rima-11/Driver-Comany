import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { Drivers } from '../models/drivers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.page.html',
  styleUrls: ['./driver-list.page.scss'],
})
export class DriverListPage implements OnInit {
 driversData : any;

  constructor(public apiService: ApiService, public router: Router) {
    this.driversData = [];
    

   }

  ngOnInit() {
  }
  async show(){
   
    this.router.navigate(['driver']);
   
    }



  ionViewWillEnter() {
  
    this.getAllDrivers();
  }

 

  getAllDrivers() {
  
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.driversData = response;
    })
  }

  delete(item) {
    
    this.apiService.deleteItem(item.id).subscribe(Response => {
     
      this.getAllDrivers();
    });
  }
 
}

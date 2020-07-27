import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  profilesData: any;

  constructor(
    public apiService: ApiService, public activatedRoute: ActivatedRoute
  ) {
    this.profilesData = [];
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not 
    // called due to view persistence in Ionic
    const id = this.activatedRoute.snapshot.params["id"] ?? 1;
    this.getProfile(id);
  }
  
  getProfile(id:number) {
    //Get saved list of profile
    this.apiService. getItem(id).subscribe(response => {
      console.log(response);
      this.profilesData = response;
      
    })
  }
}

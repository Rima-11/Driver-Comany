import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Drivers } from '../models/drivers';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.page.html',
  styleUrls: ['./driver-edit.page.scss'],
})
export class DriverEditPage implements OnInit {
id: number;
data: Drivers;
  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService) { 
      this.data = new Drivers();
    }

  ngOnInit() {
    if(this.activatedRoute.snapshot.params["id"]){
      this.id = this.activatedRoute.snapshot.params["id"];
    }
   
    
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }
  update() {
    
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      console.log("driver edited:" , this.data)
      this.router.navigate(['driver-list']);
    })
  }
}

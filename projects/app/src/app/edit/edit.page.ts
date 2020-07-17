import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Profile } from '../models/profile';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  profilesData: any;
  id: number;
  user: Profile;
  
  constructor( public apiService: ApiService, public activatedRoute: ActivatedRoute) {  
   this.user = new Profile;
  }

  ngOnInit() {
    console.log(2)
    this.id = this.activatedRoute.snapshot.params["id"] ?? 1;
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.user = response;
      console.log(this.user)
    })
  }

  update(userUpdated : Profile) {
    console.log(userUpdated)
    //Update item by taking id and updated data object
    this.apiService.updateItem(userUpdated.id, userUpdated).subscribe(data => {
     console.log(data)
    })
  }
}

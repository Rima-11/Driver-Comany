import { Component, OnInit } from '@angular/core';
import { Profile } from '../models/profile';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: number;
  data: Profile;
  constructor(
    public apiService: ApiService,
    public router: Router
  ) {
    this.data = new Profile();
  }

  ngOnInit() {
  }

  update() {
    //Update item by taking id and updated data object
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      console.log(this.data);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { UsersCompany } from '../models/users-company';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
data:UsersCompany

  constructor(public apiService: ApiService,
    public router: Router,
    ) {  
      this.data = new UsersCompany();
    }

  ngOnInit() {
  }
  signin(){
    this.apiService.createUsers(this.data).subscribe((response) => {
      this.router.navigate(['folder/Outbox']);
    });

  }
  }


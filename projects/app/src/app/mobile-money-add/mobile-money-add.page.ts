import { Component, OnInit } from '@angular/core';
import { Mobilemoney } from '../models/mobilemoney';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-money-add',
  templateUrl: './mobile-money-add.page.html',
  styleUrls: ['./mobile-money-add.page.scss'],
})
export class MobileMoneyAddPage implements OnInit {
  data: Mobilemoney;
  constructor(public apiService: ApiService,
              public router: Router) {this.data = new Mobilemoney(); }

  ngOnInit() {}

  submitForm() {
    this.apiService.createItemMobileMoney(this.data).subscribe((response) => {
      this.router.navigate(['payment']);
    });

  }
}

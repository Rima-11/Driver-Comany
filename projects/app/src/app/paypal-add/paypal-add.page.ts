import { Component, OnInit } from '@angular/core';
import { Paypal } from '../models/paypal';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-paypal-add',
  templateUrl: './paypal-add.page.html',
  styleUrls: ['./paypal-add.page.scss'],
})
export class PaypalAddPage implements OnInit {
data: Paypal;
  constructor(public apiService: ApiService,
              public router: Router) {this.data = new Paypal(); }

  ngOnInit() {
  }
  submitForm() {
    this.apiService.createItemPaypal(this.data).subscribe((response) => {
      this.router.navigate(['payment']);
    });

  }
}

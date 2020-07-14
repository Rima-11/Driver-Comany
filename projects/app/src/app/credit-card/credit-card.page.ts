import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { CreditCard } from './../models/credit-card';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.page.html',
  styleUrls: ['./credit-card.page.scss'],
})
export class CreditCardPage implements OnInit {
data: CreditCard;
  constructor( public apiService: ApiService,
               public router: Router) {this.data = new CreditCard(); }

  ngOnInit() {
  }
  submitForm() {
    this.apiService.createItemCreditCard(this.data).subscribe((response) => {
      this.router.navigate(['payment']);
    });

  }
}

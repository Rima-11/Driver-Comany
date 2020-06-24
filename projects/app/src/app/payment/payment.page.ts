import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  PaypalsData: any;
  MobileMoneysData: any;
  CreditCardsData: any;
  constructor(public apiService: ApiService) {
    this.PaypalsData = [];
    this.MobileMoneysData = [];
    this.CreditCardsData = [];
   }

  ngOnInit() {
  }
  ionViewWillEnter() {

    this.getAllPaypal();
    this.getAllMobileMoney();
    this.getAllCreditCard();
  }

  getAllPaypal() {
    //Get saved list of students
    this.apiService.getListPaypal().subscribe(response => {
      console.log(response);
      this.PaypalsData = response;
    })
  }


  delete(item) {
    //Delete item in Student data
    this.apiService.deleteItemPaypal(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllPaypal();
    });
  }
  getAllMobileMoney() {
    //Get saved list of students
    this.apiService.getListMobileMoney().subscribe(response => {
      console.log(response);
      this.MobileMoneysData = response;
    })
  }


  deleteMobileMoney(item) {
    //Delete item in Student data
    this.apiService.deleteMobileMoney(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllMobileMoney();
    });
  }

    getAllCreditCard() {
    //Get saved list of students
    this.apiService.getListCreditCard().subscribe(response => {
      console.log(response);
      this.CreditCardsData = response;
    })
  }


  deleteCreditCard(item) {
    //Delete item in Student data
    this.apiService.deleteCreditCard(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllCreditCard();
    });
  }
}

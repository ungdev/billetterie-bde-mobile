import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/StorageService';

@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket-details.html',
  providers: [StorageService]
})
export class TicketDetailsPage {

  ticket: any
  don: number
  // public mainPage: any;


  constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private storage: StorageService,
      ) {
    this.ticket = {name:'', firstName: '', qrcode: '', options: []}
    this.don = 0
  }

  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(3);
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(1);
    }
  }

  isEmpty(obj){
    if(typeof obj === 'object' && obj !== null){
      if(Object.keys(obj).length === 0)
        return true;
    }
    return false;;
  }

  ionViewDidLoad() {
    this.ticket = this.navParams.get('ticket')
    // this.mainPage = this.navParams.get('this')
  }

}
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket_details.html'
})
export class TicketDetailsPage {

  public ticket: any;
  public mainPage: any;


  constructor(public navCtrl: NavController, private storage : Storage, public navParams: NavParams) {
    this.ticket = {"name":"", "surname":"", "qrcode":"", "options":[]}
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

  delete(){
    this.navCtrl.pop()
    for(let ticket in this.mainPage.tickets){
      if(this.mainPage.tickets[ticket].qrcode === this.ticket.qrcode){
        this.mainPage.tickets.splice(ticket, 1)
      }
    }
    this.storage.remove('tickets')
    this.storage.set('tickets', this.mainPage.tickets)
  }

  ionViewDidLoad() {
    this.ticket = this.navParams.get('ticket')
    this.mainPage = this.navParams.get('this')
    console.log(this.ticket)
  }

  hasFastPass(){
    if(this.ticket.options.indexOf("Fastpass") == -1)
      return false;
    return true;
  }

  hasCashLess(){
    if(this.ticket.options.indexOf("Achat d’un support de paiement type ​cashless​") == -1)
      return false;
    return true;
  }
}

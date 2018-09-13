import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';

import { RequestService } from '../../services/RequestService'

import { TicketModal } from '../ticket-modal/ticket-modal'

@Component({
  templateUrl: 'buy.html',
  providers: [RequestService]
})
export class BuyPage {

  tickets: any;


  constructor(
      private iab: InAppBrowser,
      private navCtrl: NavController,
      private modalCtrl: ModalController,
      private alertCtrl: AlertController,
      private request: RequestService,
      ) {
        this.tickets = [
          {id:1, name: 'Dufour', firstName: 'Arnaud', mail: 'arnaud.dufour@utt.fr', options:[{optionID: 't-shirt-M', quantity: 3}]},
          {id:2, name: 'DAutume', firstName: 'Christian Edouard', mail: 'chris.daut@utt.fr'},
        ]
  }

  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(3);
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(1);
    }
  }

  paye() {
    console.log('paye')
    this.tickets = [ //temp
      {id:1, name: 'Dufour', firstName: 'Arnaud', mail: 'arnaud.dufour@utt.fr'},
      {id:2, name: 'DAutume', firstName: 'Christian Edouard', mail: 'chris.daut@utt.fr'},
    ]
  }
  editTicket(ticket){
    console.log('edit', ticket)
    this.modalCtrl.create(TicketModal, { ticket }).present()
  }
  deleteTicket(ticket){
    console.log('delete', ticket)
    this.tickets.splice(this.tickets.indexOf(ticket), 1)
    console.log(this.tickets)
  }

  addTicket() {
    this.modalCtrl.create(TicketModal).present()
  }
}

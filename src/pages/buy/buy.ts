import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';

import { RequestService } from '../../services/RequestService'
import { StorageService } from '../../services/StorageService'

import { TicketModal } from '../ticket-modal/ticket-modal'

@Component({
  templateUrl: 'buy.html',
  providers: [RequestService, StorageService]
})
export class BuyPage {

  tickets: any

  constructor(
      private iab: InAppBrowser,
      private navCtrl: NavController,
      private modalCtrl: ModalController,
      private viewCtrl: ViewController,
      private alertCtrl: AlertController,
      private request: RequestService,
      private storage: StorageService,
      ) {
        this.tickets = storage.getCartTickets()
  }

  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(0);
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(2);
    }
  }

  close() {
    this.viewCtrl.dismiss()
  }

  paye() {
    console.log('paye')
    if(true) {  //etupay validation TODO
      this.tickets.forEach(ticket => {
        ticket.qrcode = "1234"
        this.storage.addTicket(ticket)
      })
      this.storage.clearCartTickets()
    } 
    this.close()
  }
  editTicket(ticket){
    console.log('edit', ticket)
    this.modalCtrl.create(TicketModal, { ticket }).present()
  }
  deleteTicket(ticket){
    this.storage.removeCartTicket(ticket)
    this.tickets= this.storage.getCartTickets()
  }

  addTicket() {
    let modal = this.modalCtrl.create(TicketModal)
    modal.onDidDismiss(() => {
      this.tickets = this.storage.getCartTickets()
      console.log(this.tickets)
    })
    modal.present()
  }
}

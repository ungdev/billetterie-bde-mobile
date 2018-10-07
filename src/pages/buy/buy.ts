import { Component } from '@angular/core'
import { NavController, ModalController, ViewController, ToastController } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser'

import { RequestService } from '../../services/RequestService'
import { StorageService } from '../../services/StorageService'

import { TicketModal } from '../ticket-modal/ticket-modal'
import { BuyerModal } from '../buyer-modal/buyer-modal'

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
      private toastCtrl: ToastController,
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
    console.log('pay', this.tickets)
    if(this.tickets.length === 0){
      console.log('NO TICKETS')
      this.toastCtrl.create({
        message: 'Vous n\'avez pas ajouté de billet',
        duration: 3000
      }).present()
      return
    }
    let modal = this.modalCtrl.create(BuyerModal, {ticket: this.tickets[0]})
    modal.present()
    modal.onDidDismiss((data) => {
      console.log(data)
      if(data.cancel) return
      if(true) {  //etupay validation TODO
        this.tickets.forEach(ticket => {
          ticket.qrcode = "1234"
          this.storage.addTicket(ticket)
        })
        this.storage.clearCartTickets()
      }
      this.close()
    })
  }
  editTicket(ticket){
    console.log('edit', ticket)
    let modal = this.modalCtrl.create(TicketModal, { ticket })
    modal.present()
    modal.onDidDismiss(() => {
      this.tickets = this.storage.getCartTickets()
    })
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

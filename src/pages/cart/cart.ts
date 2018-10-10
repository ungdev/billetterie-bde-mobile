import { Component } from '@angular/core'
import { NavController, ModalController, ViewController, ToastController } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser'

import { RequestService } from '../../services/RequestService'
import { StorageService } from '../../services/StorageService'

import { TicketModal } from '../ticket-modal/ticket-modal'
import { TicketTypeModal } from '../ticket-type-modal/ticket-type-modal'
import moment from 'moment'

@Component({
  selector: 'cart',
  templateUrl: 'cart.html',
  providers: [RequestService, StorageService]
})
export class CartPage {

  tickets: any
  prices: any
  total: number

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
        console.log(this.tickets)
        this.calculateTotal()
        this.prices = storage.getPrices()
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
    let buyer = this.storage.getBuyer()
    let order = {
      buyer,
      items: []
    }
    this.tickets.forEach(ticket => {
      order.items.push({
        name: ticket.name,
        surname: ticket.firstName,
        mail: ticket.mail,
        price_id: this.prices[0].id, //????
        options: ticket.options.map(option => { return { id: option.optionID, qty: option.quantity } }),
        fields: ticket.options.map(option => { return { id: option.optionID, value: option.optionID } })
      })
    })
    console.log('order', order)
    this.request.post('order/create', order)
      .then(res => {
        console.log(res)
        res.data.order_id
        res.data.amount
        res.data.paiement_url
      })
      .catch(e => console.log(e))
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
    let modal = this.modalCtrl.create(TicketModal, { ticket })
    modal.present()
    modal.onDidDismiss(() => {
      this.tickets = this.storage.getCartTickets()
      this.calculateTotal()
    })
  }
  deleteTicket(ticket){
    this.storage.removeCartTicket(ticket)
    this.tickets= this.storage.getCartTickets()
    this.calculateTotal()
  }

  addTicket() {
    let modal = this.modalCtrl.create(TicketTypeModal)
    modal.onDidDismiss(() => {
      this.tickets = this.storage.getCartTickets()
      this.calculateTotal()
    })
    modal.present()
  }

  getOptionValue(ticket, option){
    const field = ticket.fields.find(f => f.id === option.id)
    return field ? field.value : 0
  }

  getPublicOptions(ticket){
    let publicOptions = ticket.options.filter(option => !option.isMandatory)
                                      .filter(option => {
                                        let field = ticket.fields.find(f => f.id === option.id)
                                        return field ? field.value !== 0 : false
                                      })
    return publicOptions
  }
  getTicketPrice(ticket) {
    let price = ticket.price.price
    ticket.price.options.forEach(option => {
      if(moment(option.start_at).isBefore()
          && moment(option.end_at).isAfter()){
        if(option.isMandatory)
          price += option.price
        else
          price += option.price * this.getOptionValue(ticket, option)
      }
    })
    return price
  }
  calculateTotal() {
    this.total = 0
    if(this.tickets) {
      this.tickets.forEach(ticket => {
        this.total += this.getTicketPrice(ticket)
      })
    }
    this.total /= 100
  }
}

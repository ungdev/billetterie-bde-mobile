import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { StorageService } from '../../services/StorageService'

@Component({
  templateUrl: 'ticket-modal.html',
  providers: [StorageService]
})
export class TicketModal {

  ticket: any
  name: string
  firstName: string
  mail: string
  don: number
  isNew: boolean
  

  constructor(
      params: NavParams,
      private viewCtrl: ViewController,
      private toastCtrl: ToastController,
      private storage: StorageService,
      ) {
        this.ticket = params.get('ticket')
        this.isNew = false
        if(!this.ticket) {
          this.isNew = true
          this.ticket = {
            id: Math.floor((Math.random() * 1000000000)),
            name: '',
            firstName: '',
            mail: '',
            options: []
          }
        }
        let donOption = this.ticket.options.find(e => e.optionID === 'don')
        if(donOption) this.don = donOption.quantity
  }

  close(){
    this.viewCtrl.dismiss()
  }

  validate() {
    if(!this.name) {
      this.toastCtrl.create({
        message: 'Vous devez rentrer un nom.',
        duration: 3000
      }).present()
      return
    }
    if(!this.firstName) {
      this.toastCtrl.create({
        message: 'Vous devez rentrer un prénom.',
        duration: 3000
      }).present()
      return
    }
    if(!this.mail) {
      this.toastCtrl.create({
        message: 'Vous devez rentrer un mail.',
        duration: 3000
      }).present()
      return
    }
    if(this.don && this.don < 0) {
      this.toastCtrl.create({
        message: 'Le don doit être positif !',
        duration: 3000
      }).present()
      return
    }
    this.ticket = {
      id: this.ticket.id,
      name: this.name,
      firstName: this.firstName,
      mail: this.mail,
      options:[]
    }
    if(this.don) this.ticket.options.push({optionID: 'don', quantity: this.don})
    if(!this.isNew) {
      this.storage.removeCartTicket(this.ticket)
      console.log('removed ticket from cart :', this.ticket)
    }
    this.storage.addCartTicket(this.ticket)
    console.log('added ticket to cart :', this.ticket)
    this.close()
  }
}

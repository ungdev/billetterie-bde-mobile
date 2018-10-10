import { Component } from '@angular/core'
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular'

import moment from 'moment'

import { StorageService } from '../../services/StorageService'

@Component({
  selector: 'ticket-modal',
  templateUrl: 'ticket-modal.html',
  providers: [StorageService]
})
export class TicketModal {

  ticket: any
  name: string
  firstName: string
  mail: string
  isNew: boolean = false
  price: any
  isChecked: any
  radioOptions : any
  optionResult: any
  total: number = 0

  constructor(
      params: NavParams,
      private viewCtrl: ViewController,
      private toastCtrl: ToastController,
      private storage: StorageService,
      ) {
        this.price = params.get('price')
        this.ticket = params.get('ticket')
        console.log(this.price, this.ticket)
        if(!this.price && this.ticket){
          this.price = this.ticket.price
        }
        const buyer = this.storage.getBuyer()
        if(!this.ticket){
          this.ticket = {
            id: Math.floor((Math.random() * 1000000000)),
            name: buyer.name,
            firstName: buyer.firstName,
            mail: buyer.mail,
            options: this.price.options
          }
          this.isNew = true
        }
        this.ticket.options = this.ticket.options
          .filter(option => !option.isMandatory)
          .filter(option => option.min_choice !== 0 || option.max_choice !== 1)
        this.optionResult = []
        this.ticket.options.forEach(option => {
          this.optionResult[option.id] = this.isNew ? 0 : 
          this.ticket.fields.find(f => f.id === option.id).value
        })

        this.isChecked = []
        this.radioOptions = this.price.options.filter(option => option.min_choice === 0 && option.max_choice === 1)
        this.radioOptions.forEach(radio => {
          if(this.isNew)
            this.isChecked[radio.id] = false
          else {
            let field = this.ticket.fields.find(f => f.id === radio.id)
            this.isChecked[radio.id] = field ? field.value : false
          }
          
        })
        this.calculateTotal()
  }

  onChange(id) {
    this.isChecked[id] = !this.isChecked[id]
    this.calculateTotal()
  }

  close(){
    this.viewCtrl.dismiss()
  }

  cancel() {
    this.viewCtrl.dismiss(true)
  }

  calculateTotal() {
    this.total = this.price.price
    console.log(this.price)
    this.price.options.filter(option => option.isMandatory)
        .forEach(option => {
          if(moment(option.start_at).isBefore()  && moment(option.end_at).isAfter()){
            this.total += option.price
          }
        })
    this.price.options.filter(option => !option.isMandatory)
        .forEach(option => {
          if(moment(option.start_at).isBefore()  && moment(option.end_at).isAfter()){
            if(option.min_choice === 0 && option.max_choice === 1){
              this.isChecked[option.id] ? this.total += option.price : null
            }
            else {
              this.total += option.price * this.optionResult[option.id]
            }
          }
        })
    this.total /= 100
  }

  validate() {
    if(!this.name && !this.firstName && !this.mail){
      this.name = this.ticket.name
      this.firstName = this.ticket.firstName
      this.mail = this.ticket.mail
    }
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
    let error = false
    this.ticket.options.forEach(option => {
      if(this.optionResult[option.id] > option.max_choice || this.optionResult[option.id] < option.min_choice){
        this.toastCtrl.create({
          message: `Le champ "${option.name}" est invalide, il doit être compris entre ${option.min_choice} et ${option.max_choice}.`,
          duration: 3000
        }).present()
        error = true
      }

    })
    if(error) return
    let fields = []
    this.radioOptions.filter(option => this.isChecked[option.id]).forEach(option => {
      fields.push({ id: option.id, value: true})
    })
    this.ticket.options.forEach(option => {
      fields.push({ id: option.id, value: this.optionResult[option.id] })
    })
    this.ticket = {
      id: this.ticket.id,
      name: this.name,
      firstName: this.firstName,
      mail: this.mail,
      options: this.price.options,
      fields,
      price: this.price
    }
    console.log("TICKET", this.ticket)
    if(!this.isNew) {
      this.storage.removeCartTicket(this.ticket)
      console.log('removed ticket from cart :', this.ticket)
    }
    this.storage.addCartTicket(this.ticket)
    console.log('added ticket to cart :', this.ticket)
    this.close()
  }
}

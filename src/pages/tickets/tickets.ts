import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TicketDetailsPage } from '../ticket-details/ticket-details'

import { RequestService } from '../../services/RequestService'
import { StorageService } from '../../services/StorageService'
import { BuyerModal } from '../buyer-modal/buyer-modal'

@Component({
  selector: 'page-ticket',
  templateUrl: 'tickets.html',
  providers: [RequestService, StorageService]
})
export class TicketsPage {

  private tickets: any
  private prices: any
  private interval: any


  constructor(
      private iab: InAppBrowser,
      public navCtrl: NavController,
      public alertCtrl: AlertController,
      private request: RequestService,
      private storage: StorageService,
      private modalCtrl: ModalController
      ) {
    this.tickets = storage.getTickets()
    this.prices = storage.getPrices()
    this.mapOptionNameToOption()
    this.launchInterval()
  }

  launchInterval() {
    if(this.interval) return
    this.interval = setInterval(() => {
      let unpaidTicket = this.tickets.find(ticket => !ticket.isPaid)
      if(!unpaidTicket) {
        clearInterval(this.interval)
        this.interval = null
        return
      }
      this.checkIfPaid()
    }, 5000)
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
        return true
    }
    return false
  }

  goToBilleterie(){
    let modal = this.modalCtrl.create(BuyerModal)
    modal.onDidDismiss(() => {
      this.tickets = this.storage.getTickets()
      this.mapOptionNameToOption()
      this.launchInterval()
    })
    modal.present()
  }

  mapOptionNameToOption() {
    if(!this.tickets) return
    this.tickets = this.tickets.map(ticket => {
      if(!ticket.options) ticket.options = []
      ticket.options = ticket.options.map(option => {
        const name = option.name ? option.name : this.getOptionName(ticket.price_id, option.id)
        return { ...option, name }
      })
      return ticket
    })
  }

  ticketDetails(ticket){
    this.navCtrl.push(TicketDetailsPage, {ticket: ticket, this: this})
  }

  deleteTicket(ticket) {
    this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Voulez vous supprimer ce billet ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Oui',
          handler: () => {
            this.storage.removeTicket(ticket)
            this.tickets = this.storage.getTickets()
            this.mapOptionNameToOption()
          }
        }
      ]
    }).present()
  }

  addClicked(){
    this.showPrompt()
  }

  presentAlert(code) {
    let alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: 'Echec de la récupération du billet, code d\'erreur ' + code,
      buttons: ['ok']
    })
    alert.present()
  }

  contactBilletterie(code, name){
    this.request.get(`billets/get?code=${code}&name=${name}`)
        .then(res => {
            if(res.status === 200){
              const t = res.data.data
              const price = this.prices.find(price => price.name === t.price)
              t.options = t.options.map(option => {
                const opt = price.options.find(opti => opti.id === option.id)
                let { qty } = option
                if(opt.max_choice === 1 && opt.min_choice === 0) {
                  qty = qty === 1 ? true : false
                }
                return {
                  id: t.id,
                  name: option.name,
                  isMandatory: opt.isMandatory,
                  qty
                }
              })
              t.options = t.options.filter(option => !option.isMandatory)
              this.storage.addTicket({
                name: t.name,
                surname: t.surname,
                mail: t.mail,
                qrcode: t.qrcode,
                price_id: price.id,
                isPaid: true,
                options: t.options
              })
              this.tickets = this.storage.getTickets()
              this.mapOptionNameToOption()
            }
            else{
              this.presentAlert(res.data.statusCode)
            }
        })
        .catch(err => {
          console.log(err)
          this.presentAlert(err.response.status + ', erreur: ' + err.response.data.error)
        })
  }

  getOptionName(price_id, optionId) {
    return this.prices && this.prices[price_id] && this.prices[price_id].options ? this.prices[price_id].options.find(option => option.id === optionId).name : ''
  }

  checkIfPaid() {
    this.tickets.filter(ticket => !ticket.isPaid).forEach((ticket, index) => {
      this.request.get(`order/get?order_id=${ticket.order_id}&mail=${ticket.orderMail}`)
        .then(res => {
          if(res.data.order.state === 'paid') {
            const qrcode = res.data.billets.find(billet => billet.name === ticket.name && billet.surname === ticket.surname).qrcode
            ticket.isPaid = true
            ticket.qrcode = qrcode
            this.tickets[index] = ticket
            this.storage.removeTicket(ticket)
            this.storage.addTicket(ticket)
          }
        })
        .catch(e => console.log(e))
    })
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Ajouter un billet',
      message: "Rentrez le numéro du billet qui se trouve sur votre place, ainsi que le nom associé pour le télécharger dans l'application",
      inputs: [
        {
          name: 'name',
          placeholder: 'Entrez votre nom'
        },
        {
          name: 'code',
          placeholder: 'Entrez le numéro du billet'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked')
          }
        },
        {
          text: 'Ajouter',
          handler: data => {
            const found = this.tickets.find(ticket => ticket.qrcode === data.code)
            if(found) this.presentAlert(409 + ", vous avez déjà ce billet.")
            else this.contactBilletterie(data.code, data.name)
          }
        }
      ]
    });
    prompt.present();
  }
}

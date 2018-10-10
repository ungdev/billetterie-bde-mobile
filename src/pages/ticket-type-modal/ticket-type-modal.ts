import { Component } from '@angular/core';
import { ViewController, ToastController, ModalController } from 'ionic-angular';

import { StorageService } from '../../services/StorageService'
import { TicketModal } from '../ticket-modal/ticket-modal'
import moment from 'moment'

@Component({
  selector: 'page-info',
  templateUrl: 'ticket-type-modal.html',
  providers: [StorageService]
})
export class TicketTypeModal {

  prices: any

  constructor(
      private viewCtrl: ViewController,
      storage: StorageService,
      private modalCtrl: ModalController,
      private toastCtrl: ToastController,
      ) {
        this.prices = storage.getPrices()
  }

  close(){
    this.viewCtrl.dismiss()
  }

  cancel(){
    this.close()
  }

  getPrice(price) {
    let alteration = 0
    price.options.filter(option => option.isMandatory).forEach(option => {
      if(moment(option.start_at).isBefore()  && moment(option.end_at).isAfter()){
        alteration += option.price
      }
    })
    return (price.price + alteration) / 100
  }

  isEmpty(obj){
    if(typeof obj === 'object' && obj !== null){
      if(Object.keys(obj).length === 0)
        return true
    }
    return false
  }

  select(price) {
    if(!price.can_buy) {
      this.toastCtrl.create({
        message: 'Vous n\'avez pas le droit à ce tarif.',
        duration: 3000
      }).present()
      return
    }
    let modal = this.modalCtrl.create(TicketModal, { price })
    modal.onDidDismiss((cancel = false) => {
      if(!cancel) this.close()
    })
    modal.present()
  }
}

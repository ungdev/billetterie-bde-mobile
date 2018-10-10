import { Component } from '@angular/core';
import { ViewController, ToastController } from 'ionic-angular';
import { ModalController } from 'ionic-angular'
import { CartPage } from '../cart/cart'
import { StorageService } from '../../services/StorageService'
import { RequestService } from '../../services/RequestService'

@Component({
  templateUrl: 'buyer-modal.html',
  providers: [StorageService, RequestService]
})
export class BuyerModal {

  name: string
  firstName: string
  mail: string
  

  constructor(
      private viewCtrl: ViewController,
      private toastCtrl: ToastController,
      private modalCtrl: ModalController,
      private request: RequestService,
      private storage: StorageService,
      ) {
        const buyer = this.storage.getBuyer()
        this.name = buyer.name
        this.firstName = buyer.firstName
        this.mail = buyer.mail
  }

  close(cancel = false){
    this.viewCtrl.dismiss({ cancel, name: this.name, firstName: this.firstName, mail: this.mail })
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
    this.storage.setBuyer({
      name: this.name,
      firstName: this.firstName,
      mail: this.mail,
    })
    let modal = this.modalCtrl.create(CartPage)
    modal.onDidDismiss(() => {
      this.close()
    })

    this.request.post('order/get_prices', { mail: this.mail }) 
      .then(res => {
        console.log(res)
        this.storage.setPrices(res.data.prices)
        modal.present()
      })
      .catch(e => console.log(e))
  }
}

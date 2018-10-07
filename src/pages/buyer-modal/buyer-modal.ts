import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { StorageService } from '../../services/StorageService'

@Component({
  templateUrl: 'buyer-modal.html',
  providers: [StorageService]
})
export class BuyerModal {

  name: string
  firstName: string
  mail: string
  

  constructor(
      params: NavParams,
      private viewCtrl: ViewController,
      private toastCtrl: ToastController,
      private storage: StorageService,
      ) {
        const ticket = params.get('ticket')
        this.name = ticket.name
        this.firstName = ticket.firstName
        this.mail = ticket.mail
  }

  close(cancel = false){
    this.viewCtrl.dismiss({ cancel, name: this.name, firstname: this.firstName, mail: this.mail })
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
    this.close()
  }
}

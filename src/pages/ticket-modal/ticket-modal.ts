import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'ticket-modal.html'
})
export class TicketModal {

  ticket: any
  tshirt: string


  constructor(
      private navCtrl: NavController,
      private alertCtrl: AlertController,
      private params: NavParams,
      private viewCtrl: ViewController,
      ) {
        this.ticket = params.get('ticket')
        if(!this.ticket) {
          this.ticket = {name: '', firstName: '', mail: '', options: []}
        }
  }

  close(){
    console.log('tshirt value', this.tshirt)
    this.viewCtrl.dismiss()
  }
}

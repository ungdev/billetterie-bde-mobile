import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import moment from 'moment'


@Component({
  selector: 'page-event-details',
  templateUrl: 'event_details.html'
})
export class EventDetailsPage{
  public id: number
  public args: any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.args = {name:"null"}
  }


  ionViewDidLoad() {
    this.args = this.navParams.get('arg')
    this.args.end_at = moment(this.args.end_at * 1000).format('HH:mm')
    console.log(this.args)
  }


}

import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser'
//import { MapPage } from '../map/map'
import { RequestService } from '../../services/RequestService'
import moment from 'moment'
import { EventDetailsPage } from './event-details/event_details'

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
  providers: [RequestService],
})
export class InfoPage {
  infosVisible: boolean
  programmeVisible: boolean
  partenaireVisible: boolean
  selection: any
  events: any
  partners: any
  isRefreshing: boolean = false

  constructor(
      private navCtrl: NavController,
      private iab: InAppBrowser,
      private request: RequestService,
      ) {
        this.selection = "info"
        this.infosVisible = true
        this.programmeVisible = false
        this.partenaireVisible = false
        this.events = []
        this.partners = []
        this.contactServeur()
  }

  isEmpty(obj){
    if(typeof obj === 'object' && obj !== null){
      if(Object.keys(obj).length === 0)
        return true
    }
    return false
  }

  doRefresh(refresher){
    if(this.isRefreshing){
      return;
    }

    this.isRefreshing = true
    
    this.contactServeur()
    setTimeout(() => {
      refresher.complete()
      this.isRefreshing = false
    }, 1000)
    
  }

  goToDetails(args:any){
    this.navCtrl.push(EventDetailsPage, {arg:args});
  }

  contactServeur() {
    this.request.get('events')
    .then(res => this.events = res.data.map(event => {return {...event, start_at:  moment(event.start_at*1000).format('HH:mm')}})
    )
    .catch(e => console.log(e))
    this.request.get('partners')
    .then(res => this.partners = res.data)
    .catch(e => console.log(e))
  }

  openMap() {
    //this.navCtrl.push(MapPage)
    this.navCtrl.parent.select(3)
  }
  ionSelect(){
    if(this.selection == "info"){
      this.infosVisible = true
      this.programmeVisible = false
      this.partenaireVisible = false
    }
    else if(this.selection == "programme"){
      this.infosVisible = false
      this.programmeVisible = true
      this.partenaireVisible = false
    }
    else{
      this.infosVisible = false
      this.programmeVisible = false
      this.partenaireVisible = true
    }
  }

  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(2)
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(0)
    }
  }

  openLink(link) {
    this.iab.create(link, '_system', {});
  }

  mailTo(email) {
    window.open(`mailto:${email}`, '_system');
 }
 
}

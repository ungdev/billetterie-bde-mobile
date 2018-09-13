import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'

@Component({
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(
        private navCtrl: NavController,
      ) {}

  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(2);
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(0);
    }
  }
}

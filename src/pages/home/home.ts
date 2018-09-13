import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  swipeEvent(event){
    if(event.direction == 2){
      this.navCtrl.parent.select(1)
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(3)
    }
  }
}

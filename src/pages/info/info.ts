import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser'


@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  public infosVisible: boolean
  public programmeVisible: boolean
  public partenaireVisible: boolean
  public selection: any

  constructor(
      private navCtrl: NavController,
      private iab: InAppBrowser,
      ) {
        this.selection = "info"
        this.infosVisible = true;
        this.programmeVisible = false;
        this.partenaireVisible = false;
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
      this.navCtrl.parent.select(2);
    }
    if(event.direction == 4){
      this.navCtrl.parent.select(0);
    }
  }

  openLink(link) {
    this.iab.create(link, '_system', {});
  }
}

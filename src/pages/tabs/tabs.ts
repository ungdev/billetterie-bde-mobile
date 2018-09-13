import { Component } from '@angular/core'
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { TicketsPage } from '../tickets/tickets'
import { BuyPage } from '../buy/buy'
import { HomePage } from '../home/home'
import { InfoPage } from '../info/info'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage
  tab2Root = InfoPage
  tab3Root = TicketsPage
  tab4Root = BuyPage
  loaded: boolean = false;
  tabIndex: number  = 0;

  constructor(private nativePageTransitions: NativePageTransitions) {

  }


  private getAnimationDirection(index):string {
    var currentIndex = this.tabIndex;
  
    this.tabIndex = index;
  
    switch (true){
      case (currentIndex < index):
        return('left');
      case (currentIndex > index):
        return ('right');
    }
  }

  public transition(e):void {
    let options: NativeTransitionOptions = {
     direction:this.getAnimationDirection(e.index),
     duration: 250,
     slowdownfactor: -1,
     slidePixels: 0,
     iosdelay: 20,
     androiddelay: 0,
     fixedPixelsTop: 0,
     fixedPixelsBottom: 48
    };
  
    if (!this.loaded) {
      this.loaded = true;
      return;
    }
  
    this.nativePageTransitions.slide(options);
  }
}

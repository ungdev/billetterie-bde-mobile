import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'

import { TabsPage } from '../pages/tabs/tabs'
import { PlatformHelper } from '../helpers/PlatformHelper'
//import { OneSignal } from '@ionic-native/onesignal'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage

  constructor(
      private platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      //private oneSignal OneSignal,
      private platformHelper: PlatformHelper,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent()
      splashScreen.hide()
    })

    /*if(this.platformHelper.isMobile(this.platform)) {
      console.log("init onesignal", this.platform)
      this.oneSignal.startInit('f0132e96-aa21-48a8-82b7-a82660cb5132', '935939627079');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
      });

      this.oneSignal.endInit()

    }*/
  }
}

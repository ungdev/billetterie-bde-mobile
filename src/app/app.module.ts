import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular'
import { NgxQRCodeModule } from 'ngx-qrcode2'
import { MyApp } from './app.component'
import { HTTP } from '@ionic-native/http'
import { OneSignal } from '@ionic-native/onesignal'

import { HomePage } from '../pages/home/home'
import { TabsPage } from '../pages/tabs/tabs'
import { TicketsPage } from '../pages/tickets/tickets'
import { BuyPage } from '../pages/buy/buy'
import { InfoPage } from '../pages/info/info'
import { MapPage } from '../pages/map/map'
import { CustomMapPage } from '../pages/custom-map/custom-map'
import { TicketDetailsPage } from '../pages/ticket-details/ticket-details'
import { CountDownComponent } from '../pages/final_countdown/countdown'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { NativePageTransitions } from '@ionic-native/native-page-transitions'
import { TicketModal } from '../pages/ticket-modal/ticket-modal'
import { BuyerModal } from '../pages/buyer-modal/buyer-modal'
import { EventDetailsPage } from '../pages/info/event-details/event_details'


@NgModule({
  declarations: [
    MyApp,
    TicketsPage,
    BuyPage,
    HomePage,
    TabsPage,
    TicketModal,
    BuyerModal,
    InfoPage,
    TicketDetailsPage,
    EventDetailsPage,
    MapPage,
    CustomMapPage,
    CountDownComponent,
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TicketsPage,
    HomePage,
    TabsPage,
    BuyPage,
    TicketModal,
    BuyerModal,
    InfoPage,
    EventDetailsPage,
    TicketDetailsPage,
    MapPage,
    CustomMapPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    InAppBrowser,
    OneSignal,
    NativePageTransitions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

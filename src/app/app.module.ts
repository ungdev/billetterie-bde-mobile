import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home'
import { TabsPage } from '../pages/tabs/tabs'
import { TicketsPage } from '../pages/tickets/tickets'
import { BuyPage } from '../pages/buy/buy'
import { InfoPage } from '../pages/info/info'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { TicketModal } from '../pages/ticket-modal/ticket-modal';


@NgModule({
  declarations: [
    MyApp,
    TicketsPage,
    BuyPage,
    HomePage,
    TabsPage,
    TicketModal,
    InfoPage,
  ],
  imports: [
    BrowserModule,
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
    InfoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    NativePageTransitions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

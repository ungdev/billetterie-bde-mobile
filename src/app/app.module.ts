import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home'
import { TabsPage } from '../pages/tabs/tabs'
import { TicketsPage } from '../pages/tickets/tickets'
import { BuyPage } from '../pages/buy/buy'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { TicketModal } from '../pages/ticket-modal/ticket-modal';

@NgModule({
  declarations: [
    MyApp,
    TicketsPage,
    BuyPage,
    HomePage,
    TabsPage,
    TicketModal,
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

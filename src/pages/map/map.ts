import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import L from 'leaflet'
import ENV from '../../config/env'

@Component({
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(
        private navCtrl: NavController,
      ) {}

  ionViewDidLoad() {
    this.loadMap()
  }
  
  loadMap() {
  
    var mymap = L.map('gmap').setView([48.268918, 4.066926], 17);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: ENV.OPEN_STREE_MAP_ACCESS_TOKEN
  }).addTo(mymap);
  }
}

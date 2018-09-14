import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'
import L from 'leaflet'
import { ENV } from '../../config/env'

@Component({
  templateUrl: 'custom-map.html'
})
export class CustomMapPage {

  constructor(
        private navCtrl: NavController,
      ) {}

  ionViewDidLoad() {
    this.loadMap()
  }
  
  loadMap() {
  
    var map = L.map('map', {zoomControl: true}).setView([48.268918, 4.066926], 17);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: ENV.OPEN_STREET_MAP_ACCESS_TOKEN
    }).addTo(map)

    let markerUTT = L.marker([48.269100, 4.066926]).addTo(map)
    markerUTT.bindPopup("<b>Université de Technologie de Troyes</b><br>12 rue Marie Curie").openPopup()
    markerUTT.on('click', () => {
      markerUTT.openPopup()
    })
    let markerEntree = L.marker([48.269100, 4.065626]).addTo(map)
    markerEntree.bindPopup("<b>Entrée</b><br>Bâtiment M")
    markerEntree.on('click', () => {
      markerEntree.openPopup()
    })
    let markerNavette = L.marker([48.269200, 4.065226]).addTo(map)
    markerNavette.bindPopup("Navettes")
    markerNavette.on('click', () => {
      markerNavette.openPopup()
    })
  }
}

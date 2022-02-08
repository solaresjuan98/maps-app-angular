import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number]
}

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li {
        cursor: pointer;
      }
    `
  ]
})
export class BookmarksComponent implements AfterViewInit {
  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  mapCenter: [number, number] = [-90.583527, 14.535879];

  // Markers array
  markers: MarkerColor[] = [];


  constructor() { }


  ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.mapCenter,
      zoom: this.zoomLevel
    });

    this.readLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola xd'

    // new mapboxgl.Marker()
    //   .setLngLat(this.mapCenter)
    //   .addTo(this.map);

  }

  addMarker() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.mapCenter)
      .addTo(this.map);

    this.markers.push({
      color,
      marker: newMarker
    });

    this.saveMarkersLocalStorage();

    newMarker.on('dragend', () => {
      this.saveMarkersLocalStorage();
    })
  }

  goToMarker(marker: MarkerColor) {
    this.map.flyTo({
      center: marker.marker?.getLngLat()
    });


  }

  saveMarkersLocalStorage() {

    const lngLatArr: MarkerColor[] = []

    this.markers.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        center: [lng, lat]
      })

    })

    localStorage.setItem('markers', JSON.stringify(lngLatArr))
  }

  readLocalStorage() {

    if (!localStorage.getItem('markers')) {
      return;
    }

    const lngLatArr: MarkerColor[] = JSON.parse(localStorage.getItem('markers')!);

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.center!)
        .addTo(this.map);

      this.markers.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.saveMarkersLocalStorage();
      })

    })


  }


  deleteMarker(i: number) {

    console.log('deleting');

    this.markers[i].marker?.remove()
    this.markers.splice(i, 1);

    this.saveMarkersLocalStorage();
  }

}

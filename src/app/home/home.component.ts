import { Component, ViewChild } from '@angular/core';
import { EventService } from '../services/api/events.service';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
  MapGeocoder,
} from '@angular/google-maps';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { EventsComponent } from '../events/events.component';


interface MarkerProperties {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  label: {
    color: string;
    text: string;
    fontSize: string;
    className: string;
  };
  description: any;
  eventname: any;
  datetime: any;
  prixtvac: any;
  weburl: any;
  imageurl: any;
  categname: any;
  color: any;
  options: {
    animation: any;
    icon: any;
  };
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  //@ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  datasEvents: any = {};
  model: any = { limit: 500 };

  constructor(
    private eventServe: EventService,
    public events: EventsComponent
  ) {
    this.eventServe.getEvents(this.model).subscribe((datas: any) => {
      //this.datasEvents = datas;
      //console.log(this.datasEvents);

      datas.events.forEach((event: any) => {
        let tmpevent: MarkerProperties = {
          id: event.id,
          position: {
            lat: event.coordx,
            lng: event.coordy,
          },

          label: {
            color: event.category.color,
            text: event.eventname,
            fontSize: '14px',
            className: 'marker-label-position',
          },

          description: event.description,
          eventname: event.eventname,
          datetime: event.date,
          prixtvac: event.prixtvac,
          weburl: event.weburl,
          imageurl: event.imageurl,
          categname: event.categname, //event.category.categname,
          color: event.category.color,

          options: {
            animation: google.maps.Animation.DROP,

            icon:
              'http://maps.google.com/mapfiles/ms/icons/' +
              event.category.color +
              '-dot.png',
          },
        };
        this.markers.push(tmpevent);
      });
      //console.log(this.markers);
    });
  }

  ngOnInit(): void {
    registerLocaleData(localeFr, 'fr');
  }

  display: any;

  center: google.maps.LatLngLiteral = {
    lat: 50.84,
    lng: 4.37,
  };

  zoom = 8;

  /*
  mapOptions: google.maps.MapOptions = {
    center: { lat: 48.8588548, lng: 2.347035 },
    zoom: 13,
  };
  */

  markers: MarkerProperties[] = [
    /*
    {
      position: { lat: 48.8584, lng: 2.2945 },
      description: 'tour eiffel',
      eventname: 'tour eiffel',
      begindate: '',
      enddate: '',
      prixtvac: 0,
      weburl: 'http://',
    }, // Eiffel Tower
    */
  ];

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  /*
  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }
  */

  /*
  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }
  */
  /*
  clickMarker(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }
*/
  previous: any;

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
    //infoWindow.close();
    infoWindow.open(marker);
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  openEvent(id: number): void {
    //this.dialogRef.close();
    this.events.openEvent(id);
  }

  onNoClick(): void {
    this.previous.close();
    //this.dialogRef.close();
  }
}

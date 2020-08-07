import { Component,  OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from "@angular/forms";
import { NavController } from '@ionic/angular';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { Storage } from  '@ionic/storage';

declare var google;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    map: any;
    baseUrl = 'assets/image.png/';
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

directionForm: FormGroup;
public searchControl: FormControl;
public destinationControl: FormControl;

title: string = 'AGM project';
latitude: number;
longitude: number;
zoom: number;
address: string;
private geoCoder;
private place;
duration: any;
distance: any;
price: any;
tarif = 7;

@ViewChild('search',{static:false})
public searchElementRef: ElementRef;
@ViewChild('destination',{static:false})
public destinationElementRef: ElementRef;

firstname : string;

createDirectionForm() {
  this.directionForm = this.fb.group({
    source: ['', Validators.required],
    destination: ['', Validators.required]
  });
}
    constructor(public geolocation: Geolocation, private fb: FormBuilder,public navCtrl: NavController, private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone, private storage: Storage )
       {
      //create search and destination FormControl
     this.searchControl = new FormControl();
     this.destinationControl = new FormControl();

  }
  ionViewWillEnter() {
    console.log(this.storage);
      this.storage.get("firstname").then((valeur ) => {
      this.firstname = valeur;
    });
  }

  ngOnInit() {
    this.createDirectionForm();
     this.loadMap() ;
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      },
      this.destinationElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    //load Places Autocomplete
this.mapsAPILoader.load().then(() => {
  this.setCurrentLocation();
  this.geoCoder = new google.maps.Geocoder;

  let autocomplete = new google.maps.places.Autocomplete(this.destinationElementRef.nativeElement, {
    types: ["address"]
  });
  autocomplete.addListener("place_changed", () => {
    this.ngZone.run(() => {
      //get the place result
      let place: google.maps.places.PlaceResult = autocomplete.getPlace();

      //verify result
      if (place.geometry === undefined || place.geometry === null) {
        return;
      }

      //set latitude, longitude and zoom
      this.latitude = place.geometry.location.lat();
      this.longitude = place.geometry.location.lng();
      this.zoom = 12;
    });
  });
});
 }
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event: any) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
}
    loadMap() {
        this.geolocation.getCurrentPosition().then((resp) => {
            let lat = resp.coords.latitude;
            let lng = resp.coords.longitude;
            const latLng = new google.maps.LatLng(lat, lng);
            this.map = new google.maps.Map(document.getElementById('map_canvas'), {
                zoom: 14,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false
            });
            this.directionsDisplay.setMap(this.map);
            this.addMyPosition(latLng);
            this.addHousePosition();
            this.addCarPosition();

       });

    }
    addMyPosition(latLng) {
        const marker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            animation: google.maps.Animation.DROP,
            title: 'My position'
        });
        this.addInfoWindowToMarker(marker);
    }
    addHousePosition() {
        const icon = this.baseUrl + 'home-outline.svg';
        const latLng = new google.maps.LatLng(4.068998, 9.7118953);
        const marker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            animation: google.maps.Animation.DROP,
            title: 'House position',
            icon: {
                url: icon,
                size: new google.maps.Size(32, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(16, 16),
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        this.addInfoWindowToMarker(marker);
    }
    addCarPosition() {
        const icon = this.baseUrl + 'car-outline.svg';
        const latLng = new google.maps.LatLng(4.068998, 9.7318953);
        const marker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            animation: google.maps.Animation.DROP,
            title: 'Car position',
            icon: {
                url: icon,
                size: new google.maps.Size(32, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(16, 16),
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        this.addInfoWindowToMarker(marker);
    }
    calculateAndDisplayRoute(formValues) {
      const that = this;
      this.directionsService.route({
        origin: formValues.source,
        destination: formValues.destination,
        travelMode:'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          console.log(response);
          that.duration = response.routes[0].legs[0].duration;
          that.distance = response.routes[0].legs[0].distance;
          that.price = parseInt(that.distance.text) * Number(that.tarif);
          that.directionsDisplay.setDirections(response);
      } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
    addInfoWindowToMarker(marker) {
        const infoWindowContent = '<div id="content">' + marker.title + '</div>';
        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });
        marker.addListener('click', () => {
            infoWindow.open(this.map, marker);
        });
    }
  }

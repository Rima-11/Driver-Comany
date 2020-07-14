import { Component,  OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


declare var google;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    map: any;
    baseUrl = 'assets/image.png/';
    directionsService = new google.maps.DirectionsService;
directionsDisplay = new google.maps.DirectionsRenderer;
directionForm: FormGroup;
    constructor(public geolocation: Geolocation, private fb: FormBuilder) {   this.createDirectionForm();  }
    ngOnInit() {
      this.loadMap();
    }
    createDirectionForm() {
      this.directionForm = this.fb.group({
        source: ['', Validators.required],
        destination: ['', Validators.required]
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
    calculateAndDisplayRoute(formValues) {
      const that = this;
      this.directionsService.route({
        origin: formValues.source,
        destination: formValues.destination,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          that.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
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


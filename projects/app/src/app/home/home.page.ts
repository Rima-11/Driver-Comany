import {Component} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    map: any;
    baseUrl = 'assets/image.png/';

    constructor(public geolocation: Geolocation) {

    }
    ngOnInit() {
      this.loadMap();
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
        const icon = this.baseUrl + 'home-address.svg';
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
        const icon = this.baseUrl + 'car.png';
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


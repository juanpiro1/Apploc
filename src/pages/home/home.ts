import { LocalizacionProvider } from './../../providers/localizacion/localizacion';
import { localizaciones } from './../../app/localizaciones';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { Observable } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/takeWhile';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  geoposicion: Geoposition;
  latitude: number;
  longitude: number;
  lel: localizaciones;
  alive: boolean;
  existe:boolean;
  mostrar: any;
  activar: number;
  constructor(public navCtrl: NavController, private GP: Geolocation, private servicio: LocalizacionProvider){
    this.alive = true;
    this.mostrar = false;
    this.existe = true;
  }
  // utilizar el exists de loopback para guardar y actualizar un solo registro de usuario
  // Al momento de hacer el proyecto ingresar el id del usuario pa identificar la ubicacion y no crear o actualizar actualizaciones nuevas dentro de la base
  // MAÑANA MOSTRAR EN MAPA LAS COORDENADAS Y AL HACERLO ENVIARSELO A JULIAN
  ionViewDidLoad(){
    this.activar=0;
    this.servicio.obtenerdir().then((res)=> 
        console.log(res)
  )
    console.log(this.activar);
    if(this.activar==0){
    this.GP.getCurrentPosition().then((position) =>{
        console.log('entro');
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      //console.log(this.latitude);
      //console.log(this.longitude);
      this.obtenerloc()
      this.activar=1;
      //console.log(this.activar);
      
      //this.obtenerloc();
      if (this.activar=1) {
        this.mostrar = true;
        TimerObservable.create(0,10000).
        takeWhile(() =>this.alive)
        .subscribe(() =>{
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('continua');
          this.actualizarloc();

    })

      }

    }
  ).catch ((e)=>{
    console.log('Error getting location', e);

  });
    }  
    
    /*TimerObservable.create(0,10000).
    takeWhile(() =>this.alive)
    .subscribe(() =>{
      //this.servicio.existeloc().then(data => this.existe=data)
      console.log("Estado "+this.existe);
      if(this.existe){
        console.log("Entro 1")
      this.GP.getCurrentPosition().then((position) =>{
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude);
        console.log(this.longitude);
        this.obtenerloc();
        if (!this.mostrar) {
          this.mostrar = true;
        }

      }
    ).catch ((e)=>{
      console.log('Error getting location', e);

    })
    this.existe= false
    console.log(this.existe);
  }

    else{
      console.log("Entro 2")
      this.GP.getCurrentPosition().then((position) =>{
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude);
        console.log(this.longitude);
        this.actualizarloc();
        if (!this.mostrar) {
          this.mostrar = true;
        }

      }
    ).catch ((e)=>{
      console.log('Error getting location', e);

    })

    }

    })

  }
  obtenerloc(){
    console.log("Latitud"+this.latitude);
    console.log("Longitud"+this.longitude);
    this.lel= new localizaciones(this.latitude,this.longitude);
    this.servicio.insertarloc(this.lel);
  }
  actualizarloc(){
    console.log("Latitud"+this.latitude);
    console.log("Longitud"+this.longitude);
    //this.lel= new localizaciones(this.latitude+100,this.longitude+100,1);
    this.servicio.actualizarloc(this.lel);

  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
    this.alive = false;
  }*/
}
obtenerloc(){
  console.log("Latitud: "+this.latitude);
  console.log("Longitud: "+this.longitude);
  this.lel= new localizaciones('Javier',this.latitude,this.longitude);
  this.servicio.insertarloc(this.lel).subscribe(res => console.log(res));
  this.servicio.obtenerveh().subscribe((res) => console.log(res))
}
actualizarloc(){
  console.log("Latitud"+this.latitude);
  console.log("Longitud"+this.longitude);
  this.lel= new localizaciones('Javier',this.latitude,this.longitude);
  this.servicio.actualizarloc(this.lel);
}
ionViewWillLeave() {
  console.log("Looks like I'm about to leave :(");
  this.alive = false;
}
}

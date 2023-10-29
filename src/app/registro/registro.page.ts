import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { Region } from '../models/region';
import { Comuna } from '../models/comuna';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuarioName:string = '';
  contrasena:string = '';
  regiones:Region[] = [];
  comunas:Comuna[] = [];
  regionSeleccionada : number = 0;
  comunaSeleccionada: number = 0;
  seleccionComuna:boolean = true;


  // Define el formulario y sus controles
  usuario = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]+$')]),
  });

  constructor(private navCtrl: NavController,
    private locationService:LocationService,
    ) { }

  goToLogin(){
    this.navCtrl.navigateForward('/home');
  }

  ngOnInit() {
    this.cargarRegion();
  }

  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    this.seleccionComuna = false;
    const req = await this.locationService.getComuna(this.regionSeleccionada);
    this.comunas = req.data;
  }
}

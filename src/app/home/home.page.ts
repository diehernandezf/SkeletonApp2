import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuarioName:string = '';
  contrasena:string = '';


  usuario = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^[0-9]+$/)])
  });

  constructor(private navCtrl: NavController, private helperservice:HelperService, private aut:AngularFireAuth) {}

  ngOnInit() {
  }

  async ingresarUsuario(){
    try{
      const loader = await this.helperservice.showLoading("cargando");
      const valIngreso = await this.aut.signInWithEmailAndPassword(this.usuarioName, this.contrasena)
      await loader.dismiss();
    }
    catch(error:any){

    }
  }

  goToRegistro(){
    this.navCtrl.navigateForward('/registro');
  }

  goToPagina1(){
    this.navCtrl.navigateForward('/pagina1');
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { StorageService } from 'src/app/ModuloPrincipal/Servicios/storage.service';
import { CambiarContrasenaRequest } from '../../Modelos/CambiarContrasenaRequest';
import { Usuario } from '../../Modelos/Usuario';
import { SeguridadService } from '../../Servicios/seguridad.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html'
})
export class CambiarContrasenaComponent implements OnInit {

  hide:boolean=true
  hide2:boolean=true
  PasswordForm:FormGroup
  Cambiarcontra:CambiarContrasenaRequest

  constructor(private mensajeModal: ToastrService,
              private __Seguridad: SeguridadService,
              private sesion:StorageService) {
    this.PasswordForm = this.CrearFormulario();
   }

  ngOnInit(): void {
  }

  CrearFormulario():FormGroup{
    return new FormGroup({
      NuevoPass: new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{8,15}$")]),
      ConfNuevoPass: new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{8,15}$")])
     })
  }

  GuardarNueva():void{
      if(this.PasswordForm.valid){
          var Contrasenas = this.PasswordForm.value;
          var usuario = this.sesion.SesionStorageObtener("Usuario") as Usuario
          if(Contrasenas.NuevoPass == Contrasenas.ConfNuevoPass){
              
              this.Cambiarcontra = new CambiarContrasenaRequest(
                usuario.nombreUsuario,
                usuario.identificacion,
                usuario.idUsuario,
                Contrasenas.NuevoPass
              )
              this.__Seguridad.CambiarContraseña(this.Cambiarcontra)
                              .subscribe((data:MensajeResponse)=>{
                                if(data.retorno){
                                  this.mensajeModal.success("Transacción exitosa","Exitoso")
                                }
                              }, err => this.mensajeModal.error(err,"Error"))
          }else{
            this.mensajeModal.info("La contraseña no son iguales","Información")
          }
      }else{
        this.mensajeModal.info("La contraseña no satisface los requerimientos","Información")
      }
  }

}

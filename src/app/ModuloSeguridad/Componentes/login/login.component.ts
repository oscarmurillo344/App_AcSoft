import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/ModuloPrincipal/Servicios/data.service';
import { StorageService } from 'src/app/ModuloPrincipal/Servicios/storage.service';
import { UsuarioLoginRequest } from '../../Modelos/UsuarioLoginRequest';
import {Md5} from 'ts-md5/dist/md5';
import { SeguridadService } from '../../Servicios/seguridad.service';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  UserForm: FormGroup;
  hide:boolean = true;
  Validar:boolean = false;
  usuarioLogin: UsuarioLoginRequest
  passMD5 = new Md5();
  mensajeResponse:MensajeResponse
  color:ThemePalette = "primary"
  Colores:ThemePalette[]=['accent','warn','primary']
  numero:number=0

  constructor(public _dataservice: DataService,
              public MensajeModal: ToastrService,
              private route: Router,
              private sesion:StorageService,
              private __Seguridad: SeguridadService) { }

  ngOnInit(): void {
    this.UserForm=this.crearFormulario();
    setInterval(()=>{
    (this.numero == this.Colores.length) ? this.numero -= this.Colores.length : this.numero++
      this.color = this.Colores[this.numero]
    },2000)
  }

  crearFormulario(){
    return new FormGroup({
     usuario: new FormControl('',Validators.required),
     contrasena: new FormControl('',Validators.required)
    });
  }

  LogIn():void{
    if(this.UserForm.valid){
      this._dataservice.Cargando = false
      var password = this.UserForm.value.contrasena
      var pass = this.passMD5.appendStr(password).end().toString()

      this.usuarioLogin = new UsuarioLoginRequest(
      this.UserForm.value.usuario,pass)
      
      this.__Seguridad.Autenticarse(this.usuarioLogin)
                        .subscribe((data:MensajeResponse) => {
                          this.mensajeResponse = data 
                          if(this.mensajeResponse.retorno){
                          this._dataservice.VerCabecera = true
                          this._dataservice.Cargando = true
                          this.sesion.SesionStorageSetear("Usuario", this.mensajeResponse.objetoRetorno.usuario)
                          this.sesion.SesionStorageSetear("Formularios", this.mensajeResponse.objetoRetorno.formularios)
                          this.route.navigate(['principal'])
                          this.MensajeModal.success("Sesión iniciada","Exitoso")
                          }
                        },(err:any)=>{
                          this.MensajeModal.error("Error en la consulta","Error")
                          this._dataservice.Cargando = true
                        })
    }else{
      this.MensajeModal.info("Campos erroneos","Información")
    }
  }

  
}
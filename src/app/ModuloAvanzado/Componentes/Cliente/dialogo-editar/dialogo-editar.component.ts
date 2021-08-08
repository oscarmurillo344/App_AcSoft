import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteRequest } from 'src/app/ModuloAvanzado/Modelos/ClienteRequest';
import { ClienteService } from 'src/app/ModuloAvanzado/Servicios/cliente.service';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';

@Component({
  selector: 'app-dialogo-editar',
  templateUrl: './dialogo-editar.component.html'
})
export class DialogoEditarComponent implements OnInit {

  ActualizarClienteForm:FormGroup
  ActCliente:ClienteRequest

  constructor(@Inject(MAT_DIALOG_DATA) public data:ClienteRequest,
                      private mensajeModal: ToastrService,
                      private fb: FormBuilder,
                      private _Clienteservice: ClienteService) {
                      this.ActCliente = data
                      }
  
  ngOnInit(): void {
    this.CrearFormulario(this.ActCliente)
  }

  CrearFormulario(cliente:ClienteRequest){
    this.ActualizarClienteForm = this.fb.group({
      IdCliente:          [cliente.IdCliente,Validators.required],
      TipoIdentificacion: [cliente.TipoIdentificacion,Validators.required],
      Identificacion:     [cliente.Identificacion,Validators.required],
      Nombre:             [cliente.Nombre,Validators.required],
      Direccion:          [cliente.Direccion,Validators.required],
      Telefono:           [cliente.Telefono,Validators.required, Validators.pattern("^[0-9]*$")],
      Correo:             [cliente.Correo,Validators.required,Validators.email],
      RazonSocial:        [cliente.RazonSocial,Validators.required],
      Estado:             [cliente.Estado,Validators.required],
      Activo:             [cliente.Activo,Validators.required]
    })  
  }
  ActualizarCliente():void{
    if(this.ActualizarClienteForm.valid){
      this.ActCliente = this.ActualizarClienteForm.value as ClienteRequest
      this._Clienteservice.Grabar(this.ActCliente)
          .subscribe( (data:MensajeResponse) =>{

          },err =>{
            this.mensajeModal.error("Error en la consulta","Error")
          })
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }

}

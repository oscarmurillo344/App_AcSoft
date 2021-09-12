import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
      idCliente:          [cliente.idCliente, Validators.required],
      tipoIdentificacion: [cliente.tipoIdentificacion,Validators.required],
      identificacion:     [cliente.identificacion,Validators.required],
      nombre:             [cliente.nombre,Validators.required],
      direccion:          [cliente.direccion,Validators.required],
      telefono:           [cliente.telefono,[Validators.required, Validators.pattern("^[0-9]*$")]],
      correo:             [cliente.correo,[Validators.required,Validators.email]],
      razonSocial:        [cliente.razonSocial,Validators.required],
      estado:             [cliente.estado.toString(),Validators.required],
      activo:             [String(cliente.activo),Validators.required]
    })  
  }
  ActualizarCliente():void{
    if(this.ActualizarClienteForm.valid){
      this.ActCliente = this.ActualizarClienteForm.value as ClienteRequest
      this._Clienteservice.Grabar(this.ActCliente)
          .subscribe( (data:MensajeResponse) =>{
            if(data.retorno){
              this.mensajeModal.success("Registro exitoso","Exitosos")
            }
          })
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }

}

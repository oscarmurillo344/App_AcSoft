import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/ModuloAvanzado/Servicios/cliente.service';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { ClienteRequest } from '../../../Modelos/ClienteRequest';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html'
})
export class CrearClienteComponent implements OnInit {

  ClienteForm:FormGroup
  cliente:ClienteRequest

  constructor(private mensajeModal: ToastrService,
              private fb: FormBuilder,
              private __clienteService: ClienteService ) { }

  ngOnInit(): void {
    this.CrearFormulario()
  }

  CrearFormulario(): void{
   this.ClienteForm = this.fb.group ({
      tipoIdentificacion: ["",Validators.required],
      identificacion:     ["",Validators.required],
      nombre:             ["",Validators.required],
      direccion:          ["",Validators.required],
      telefono:           ["",[Validators.required, Validators.pattern("^[0-9]*")]],
      correo:             ["",[Validators.required,Validators.email]],
      razonSocial:        ["",Validators.required],
      estado:             ["",Validators.required],
      activo:             ["",Validators.required]
    });
  }
  
  CrearCliente():void{
    if(this.ClienteForm.valid){
      this.cliente = this.ClienteForm.value as ClienteRequest
      this.cliente.estado = Number(this.cliente.estado)
      this.__clienteService.Grabar(this.cliente)
                              .subscribe( (data:MensajeResponse) => {
                                this.mensajeModal.success(data.mensajeRetorno,"Exitosos")
                              }, err => {
                                this.mensajeModal.error(err.error.mensajeRetorno,"Error")
                              })
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }

}

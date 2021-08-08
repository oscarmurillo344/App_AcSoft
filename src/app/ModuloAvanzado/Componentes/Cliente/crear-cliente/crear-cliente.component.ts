import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/ModuloAvanzado/Servicios/cliente.service';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { DataService } from 'src/app/ModuloPrincipal/Servicios/data.service';
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
              private __clienteService: ClienteService,
              private _dataService: DataService ) { }

  ngOnInit(): void {
    this.CrearFormulario()
  }

  CrearFormulario(): void{
   this.ClienteForm = this.fb.group ({
      IdCliente:          ["",Validators.required],
      TipoIdentificacion: ["",Validators.required],
      Identificacion:     ["",Validators.required],
      Nombre:             ["",Validators.required],
      Direccion:          ["",Validators.required],
      Telefono:           ["",[Validators.required, Validators.pattern("^[0-9]*")]],
      Correo:             ["",[Validators.required,Validators.email]],
      RazonSocial:        ["",Validators.required],
      Estado:             ["",Validators.required],
      Activo:             ["",Validators.required]
    });
  }
  CrearCliente():void{
    if(this.ClienteForm.valid){
      this._dataService.Cargando = false
      this.cliente = this.ClienteForm.value as ClienteRequest
      this.__clienteService.Grabar(this.cliente)
                              .subscribe( (data:MensajeResponse) => {
                                this.mensajeModal.success("Registro exitoso","Exitosos")
                                this._dataService.Cargando = true
                              }, err => {
                                this.mensajeModal.error("Error en consulta","Error")
                                this._dataService.Cargando = true
                              })
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }

}

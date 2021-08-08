import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ControladoraService } from 'src/app/ModuloAvanzado/Servicios/controladora.service';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { DataService } from 'src/app/ModuloPrincipal/Servicios/data.service';
import { ControladoraRequest } from '../../../Modelos/ControladoraRequest';

@Component({
  selector: 'app-crear-controladora',
  templateUrl: './crear-controladora.component.html'
})
export class CrearControladoraComponent implements OnInit {

  ControladoraForm:FormGroup
  Controladora:ControladoraRequest

  constructor(
    private mensajeModal: ToastrService,
    private fb: FormBuilder,
    private _Controladorservice:ControladoraService,
    private _dataService: DataService
    ) {  }

  ngOnInit(): void {
    this.CrearFormuario()
  }

  CrearFormuario(){
    this.ControladoraForm = this.fb.group({
        Nombre: ['', Validators.required, Validators.maxLength(10)],
        Codigo: ['', Validators.required],
        Marca:  ['', Validators.required],
        Serie:  ['', Validators.required, Validators.maxLength(20)],
        Activo: ['', Validators.required]
    });
  }

  CrearControladora(): void{
    if(this.ControladoraForm.valid){
      this._dataService.Cargando = false
      this.Controladora = this.ControladoraForm.value as ControladoraRequest
      this._Controladorservice.Grabar(this.Controladora)
          .subscribe( (data:MensajeResponse) =>{
            if(data.retorno){
              this._dataService.Cargando = true
              this.mensajeModal.success("Registro exitoso","Exitosos")
            }
          },() => {
            this._dataService.Cargando = true
            this.mensajeModal.error("Error en la consulta", "Error")
          })
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }

}

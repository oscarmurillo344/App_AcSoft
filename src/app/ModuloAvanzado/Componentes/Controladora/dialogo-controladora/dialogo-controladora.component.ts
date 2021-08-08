import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ControladoraRequest } from 'src/app/ModuloAvanzado/Modelos/ControladoraRequest';
import { ControladoraService } from 'src/app/ModuloAvanzado/Servicios/controladora.service';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { DataService } from 'src/app/ModuloPrincipal/Servicios/data.service';

@Component({
  selector: 'app-dialogo-controladora',
  templateUrl: './dialogo-controladora.component.html'
})
export class DialogoControladoraComponent implements OnInit {

  ControladoraAct:ControladoraRequest
  ActControladoraForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:ControladoraRequest,
                  private fb: FormBuilder,
                  private mensajeModal: ToastrService,
                  private _Controladorservice:ControladoraService,
                  private _dataService: DataService) { 
                  this.ControladoraAct = data
                 }
              
  ngOnInit(): void {
    this.CrearFormulario(this.ControladoraAct)
  }

  CrearFormulario(controladora:ControladoraRequest): void{
    this.ActControladoraForm = this.fb.group({
        Nombre: [controladora.Nombre, Validators.required, Validators.maxLength(10)],
        Codigo: [controladora.Codigo, Validators.required],
        Marca: [controladora.Marca ,Validators.required],
        Serie: [controladora.Serie, Validators.required, Validators.maxLength(20)],
        Activo: [controladora.Activo, Validators.required]
    })
  }
  
  ActualizarControladora(): void{
    if(this.ActControladoraForm.valid){
      this._dataService.Cargando = false
      this.ControladoraAct = this.ActControladoraForm.value as ControladoraRequest
      this._Controladorservice.Grabar(this.ControladoraAct)
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

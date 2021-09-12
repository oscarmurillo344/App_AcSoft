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
                  ) { 
                  this.ControladoraAct = data
                 }
              
  ngOnInit(): void {
    this.CrearFormulario(this.ControladoraAct)
  }

  CrearFormulario(controladora:ControladoraRequest): void{
    this.ActControladoraForm = this.fb.group({
        nombre:         [controladora.nombre,[Validators.required, Validators.maxLength(10)]],
        idControladora: [controladora.idControladora, Validators.required],
        idMarca:        [controladora.idMarca.toString() ,Validators.required],
        serie:          [controladora.serie, [Validators.required, Validators.maxLength(20)]],
        activo:         [String(controladora.activo), Validators.required]
    })
  }
  
  ActualizarControladora(): void{
    if(this.ActControladoraForm.valid){
      this.ControladoraAct = this.ActControladoraForm.value as ControladoraRequest
      this.ControladoraAct.idMarca = Number(this.ControladoraAct.idMarca)
      this._Controladorservice.Grabar(this.ControladoraAct)
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ControladoraService } from 'src/app/ModuloAvanzado/Servicios/controladora.service';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
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
    private _Controladorservice:ControladoraService
    ) {  }

  ngOnInit(): void {
    this.CrearFormuario()
  }

  CrearFormuario(){
    this.ControladoraForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.maxLength(10)]],
        idMarca:['', Validators.required],
        serie:  ['', [Validators.required, Validators.maxLength(20)]],
        activo: ['', Validators.required]
    });
  }

  CrearControladora(): void{
    if(this.ControladoraForm.valid){
      this.Controladora = this.ControladoraForm.value as ControladoraRequest
      this.Controladora.idMarca = Number(this.Controladora.idMarca)
      this._Controladorservice.Grabar(this.Controladora)
          .subscribe( (data:MensajeResponse) =>{
            if(data.retorno){
              this.mensajeModal.success("Registro exitoso","Exitosos")
            }
            this.ControladoraForm.reset()
          })
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }

}

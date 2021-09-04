import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ControladoraRequest } from 'src/app/ModuloAvanzado/Modelos/ControladoraRequest';
import { TagRequest } from 'src/app/ModuloAvanzado/Modelos/TagRequest';
import { TagService } from 'src/app/ModuloAvanzado/Servicios/tag.service';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';

@Component({
  selector: 'app-crear-tag',
  templateUrl: './crear-tag.component.html'
})
export class CrearTagComponent implements OnInit {

  TagForm:FormGroup
  Tag:TagRequest

  constructor(
    private mensajeModal: ToastrService,
    private fb: FormBuilder,
    private _servicioTag:TagService
    ) {  }

  ngOnInit(): void {
    this.CrearFormuario()
  }

  CrearFormuario(){
    this.TagForm = this.fb.group({
        nombre:       ['', [Validators.required, Validators.maxLength(10)]],
        codigoAcceso: ['', [Validators.required, Validators.maxLength(20)]],
        activo:       ['', Validators.required]
    });
  }

  CrearTag(): void{
    if(this.TagForm.valid){
      this.Tag = this.TagForm.value as TagRequest
      this._servicioTag.Grabar(this.Tag)
            .subscribe((data:MensajeResponse)=>{
              if(data.retorno){
                this.mensajeModal.success("Registro exitoso","Exitosos")
              }
              this.TagForm.reset()
            },() => {
              this.mensajeModal.error("Error en la consulta", "Error")
            })
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }

}

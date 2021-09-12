import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TagRequest } from 'src/app/ModuloAvanzado/Modelos/TagRequest';
import { TagService } from 'src/app/ModuloAvanzado/Servicios/tag.service';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';

@Component({
  selector: 'app-dialogo-tag',
  templateUrl: './dialogo-tag.component.html'
})
export class DialogoTagComponent implements OnInit {

  TagAct:TagRequest
  ActTagForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data:TagRequest,
                 private mensajeModal: ToastrService,
                 private fb: FormBuilder,
                 private _servicioTag:TagService
                 ) { 
                  this.TagAct = data
                 }
              
  ngOnInit(): void {
    this.CrearFormulario(this.TagAct)
  }

  CrearFormulario(Tag:TagRequest): void{
    this.ActTagForm = this.fb.group({
        nombre:       [Tag.nombre, [Validators.required, Validators.maxLength(10)]],
        idTag:        [Tag.idTag, Validators.required],
        codigoAcceso: [Tag.codigoAcceso , [Validators.required, Validators.maxLength(20)]],
        activo:       [String(Tag.activo), Validators.required]
    })
  }
  
  ActualizarTag(): void{
    if(this.ActTagForm.valid){
      this.TagAct = this.ActTagForm.value as TagRequest
      this.TagAct.idTag = Number(this.TagAct.idTag) 
      this._servicioTag.Grabar(this.TagAct)
            .subscribe((data:MensajeResponse)=>{
              if(data.retorno){
                this.mensajeModal.success("Registro exitoso","Exitosos")
              }
              this.ActTagForm.reset()
            })
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }



}

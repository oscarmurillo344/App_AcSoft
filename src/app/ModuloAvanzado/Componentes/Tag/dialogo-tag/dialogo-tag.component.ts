import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TagRequest } from 'src/app/ModuloAvanzado/Modelos/tag-request';

@Component({
  selector: 'app-dialogo-tag',
  templateUrl: './dialogo-tag.component.html'
})
export class DialogoTagComponent implements OnInit {

  TagAct:TagRequest
  ActTagForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data:TagRequest,
                 private mensajeModal: ToastrService,
                 private fb: FormBuilder) { 
                  this.TagAct = data
                 }
              
  ngOnInit(): void {
    this.CrearFormulario(this.TagAct)
  }

  CrearFormulario(controladora:TagRequest): void{
    this.ActTagForm = this.fb.group({
        Nombre:       [controladora.Nombre, Validators.required, Validators.maxLength(10)],
        Codigo:       [controladora.Codigo, Validators.required],
        CodigoAcceso: [controladora.CodigoAcceso ,Validators.required, Validators.maxLength(20)],
        Activo:       [controladora.Activo, Validators.required]
    })
  }
  
  ActualizarTag(): void{
    if(this.ActTagForm.valid){
      this.TagAct = this.ActTagForm.value as TagRequest
      console.log(this.TagAct)
      this.mensajeModal.success("Registro exitoso","Exitosos")
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }



}

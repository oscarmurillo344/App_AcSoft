import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ControladoraRequest } from 'src/app/ModuloAvanzado/Modelos/ControladoraRequest';
import { TagRequest } from 'src/app/ModuloAvanzado/Modelos/tag-request';

@Component({
  selector: 'app-crear-tag',
  templateUrl: './crear-tag.component.html'
})
export class CrearTagComponent implements OnInit {

  TagForm:FormGroup
  Tag:TagRequest

  constructor(
    private mensajeModal: ToastrService,
    private fb: FormBuilder
    ) {  }

  ngOnInit(): void {
    this.CrearFormuario()
  }

  CrearFormuario(){
    this.TagForm = this.fb.group({
        Nombre:       ['', Validators.required, Validators.maxLength(10)],
        Codigo:       ['', Validators.required],
        CodigoAcceso: ['', Validators.required, Validators.maxLength(20)],
        Activo:       ['', Validators.required]
    });
  }

  CrearTag(): void{
    if(this.TagForm.valid){
      this.Tag = this.TagForm.value as TagRequest
      console.log(this.Tag)
      this.mensajeModal.success("Registro exitoso","Exitosos")
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }

}

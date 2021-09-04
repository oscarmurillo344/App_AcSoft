import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { ClienteRequest } from '../../Modelos/ClienteRequest';
import { GrabarClienteTagRequest } from '../../Modelos/GrabarClienteTagRequest';
import { TagRequest } from '../../Modelos/TagRequest';
import { ClienteService } from '../../Servicios/cliente.service';
import { TagService } from '../../Servicios/tag.service';
import { ToastrService } from 'ngx-toastr';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-cliente-asignar-tag',
  templateUrl: './cliente-asignar-tag.component.html'
})
export class ClienteAsignarTagComponent implements OnInit, OnDestroy {

  ListaAsignar:Array<any>
  FormClienteTag: FormGroup
  GrabarClienteTag: GrabarClienteTagRequest
  displayedColumns = ['N','Marca','Nombre', 'Serie', 'Eliminar']
  optionsCliente: ClienteRequest[];
  optionsTag: TagRequest[];
  Tags:TagRequest[]=[]
  @ViewChild('TagInput') TagInput: ElementRef<HTMLInputElement>;
  private unsubscribe:Subject<void> 
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private _servicioCliente: ClienteService,
    private _servicioTag: TagService,
    private mensajeModal: ToastrService
  ) { }

  ngOnInit(): void {
    this.CrearFormulario()
    this.ListaAsignar = new Array()
    this.GrabarClienteTag = new GrabarClienteTagRequest()
    this.unsubscribe = new Subject<void>()
    this.InicializarFiltros()
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  CrearFormulario():void{
    this.FormClienteTag = this.fb.group({
      clienteControl: ['', Validators.required],
      tagsControl:['']
    })
  }

  InicializarFiltros():void{
    this.FormClienteTag.get('clienteControl').valueChanges
    .subscribe(
        (mensaje) => {
         if(mensaje.length > 1){
          this.optionsCliente = []
          this._servicioCliente.Listar(mensaje)
            .subscribe((data:MensajeResponse) => {
              if(data.retorno)
              this.optionsCliente = data.objetoRetorno.clientes as ClienteRequest []
            })
         }
        })

    this.FormClienteTag.get('tagsControl').valueChanges
    .subscribe(
        (mensaje:string) => {
          if(mensaje.length > 1){
            this.optionsTag = []
            this._servicioTag.Listar(mensaje)
            .subscribe((data:MensajeResponse)=>{
              if(data.retorno)
              this.optionsTag = data.objetoRetorno.tags as TagRequest []
            })
          }
        })
  }

  resetInputs():void{
    this.TagInput.nativeElement.value = ''
    this.FormClienteTag.get('tagsControl').setValue(null);
 }

  remove(tag: TagRequest): void {
    this.Tags = this.Tags.filter((data:TagRequest) => data.idTag != tag.idTag)
    this.resetInputs()
  }

  SeleccionTag(event: MatAutocompleteSelectedEvent): void {
    if(!this.Tags.find((data:TagRequest) => data.idTag == event.option.value.idTag)){
      this.Tags.push(event.option.value as TagRequest);
      this.resetInputs()
    }
  }

  AgregarCliente():void{
    if(this.FormClienteTag.valid && this.Tags.length > 0){
      this.GrabarClienteTag.cliente = this.optionsCliente[0]
      this.GrabarClienteTag.tags = this.Tags
      this._servicioCliente.AsignarTags(this.GrabarClienteTag)
          .subscribe((data:MensajeResponse) =>{
            if(data.retorno){
              this.mensajeModal.success("Exitoso", "Registro exitoso")
            }
          })
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }

}

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
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente-asignar-tag',
  templateUrl: './cliente-asignar-tag.component.html'
})
export class ClienteAsignarTagComponent implements OnInit, OnDestroy {

  ListaAsignar:MatTableDataSource<TagRequest>
  FormClienteTag: FormGroup
  GrabarClienteTag: GrabarClienteTagRequest
  VerBoton:boolean = true
  displayedColumns = ['N','Nombre', 'Codigo', 'Eliminar']
  optionsCliente: ClienteRequest[];
  optionsTag: TagRequest[];
  Tags:TagRequest[]=[]
  @ViewChild('TagInput') TagInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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

  inicializarPaginator() {
    this.ListaAsignar.paginator = this.paginator;
  }

  InicializarFiltros():void{
    this.FormClienteTag.get('clienteControl').valueChanges
    .pipe( takeUntil(this.unsubscribe ))
    .subscribe(
        (mensaje) => {
         if((mensaje != null && mensaje != undefined) && mensaje.length > 1){
          this.optionsCliente = []
          this._servicioCliente.Listar(mensaje)
            .subscribe((data:MensajeResponse) => {
              if(data.retorno)
              this.optionsCliente = data.objetoRetorno.clientes as ClienteRequest []
            })
         }
        })

    this.FormClienteTag.get('tagsControl').valueChanges
    .pipe( takeUntil(this.unsubscribe ))
    .subscribe(
        (mensaje:string) => {
          if((mensaje != null && mensaje != undefined) && mensaje.length > 1){
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

  MostarClienteTags(event: MatAutocompleteSelectedEvent):void {
    let clienteTags = Number(event.option.id)
    this._servicioCliente.ConsultarClienteTag(clienteTags)
          .subscribe((data:MensajeResponse) => {
            if(data.retorno){
              this.ListaAsignar = new MatTableDataSource(data.objetoRetorno.tags)
              this.inicializarPaginator()
            }
          })
  }

  Eliminar(tag:TagRequest):void{
    this.ListaAsignar = new MatTableDataSource(this.ListaAsignar.data.filter( data=> data.idTag != tag.idTag))
  }

  AgregarClienteTags():void{
    if(this.FormClienteTag.valid && this.Tags.length > 0){
      this.ListaAsignar.data.forEach( 
        data => (this.Tags.find(
          filtro=> filtro.nombre==data.nombre) == null)?this.Tags.push(data):null) // merge con los datos del grid y inputTag
      this.ListaAsignar = new MatTableDataSource(this.Tags)
      this.inicializarPaginator()
      this.Tags=[]
      this.VerBoton = false
      this.mensajeModal.info("Se agregaron tags", "Información")
    }else{
      this.mensajeModal.warning("El formulario es inválido","Advertencia")
    }
  }

  GrabarClienteTags(): void{
    if(this.FormClienteTag.valid && this.ListaAsignar.data.length > 0){
    this.GrabarClienteTag.cliente = this.optionsCliente[0]
    this.GrabarClienteTag.tags = this.ListaAsignar.data
    this._servicioCliente.AsignarTags(this.GrabarClienteTag)
    .subscribe((data:MensajeResponse) =>{
      if(data.retorno){
        this.mensajeModal.success("Exitoso", "Registro exitoso")
        this.FormClienteTag.reset()
        this.VerBoton = true
        this.inicializarPaginator()
        this.ListaAsignar = null
        this.Tags=[]
      }
    })
  }else{
    this.mensajeModal.warning("El formulario es inválido","Advertencia")
  }
}

}

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { ClienteRequest } from '../../Modelos/ClienteRequest';
import { ControladoraRequest } from '../../Modelos/ControladoraRequest';
import { GrabarClienteControladoraRequest } from '../../Modelos/GrabarClienteControladoraRequest';
import { ClienteService } from '../../Servicios/cliente.service';
import { ControladoraService } from '../../Servicios/controladora.service';
import {  MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'cliente-asignar-controladora',
  templateUrl: './cliente-asignar-controladora.component.html'
})
export class ClienteAsignarControladoraComponent implements OnInit, OnDestroy {


  separatorKeysCodes: number[] = [ENTER, COMMA];
  ListaAsignar:MatTableDataSource<ControladoraRequest>
  VerBoton:boolean = true
  FormClienteControlador: FormGroup
  GrabarClienteControlador: GrabarClienteControladoraRequest
  displayedColumns = ['N','Marca','Nombre', 'Serie', 'Eliminar']
  optionsCliente: ClienteRequest[]
  optionsControladora: ControladoraRequest[]
  Controladoras: ControladoraRequest[]=[]
  @ViewChild('ControladorInput') ControladorInput: ElementRef<HTMLInputElement>;
  private unsubscribe:Subject<void> 

  constructor(
    private fb: FormBuilder,
    private _servicioCliente: ClienteService,
    private _servicioControlador: ControladoraService,
    private mensajeModal: ToastrService
  ) { }


  ngOnInit(): void {
    this.CrearFormulario()
    this.ListaAsignar = new MatTableDataSource()
    this.GrabarClienteControlador = new GrabarClienteControladoraRequest()
    this.unsubscribe = new Subject<void>()
    this.InicializarFiltros()
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

  CrearFormulario():void{
    this.FormClienteControlador = this.fb.group({
      clienteControl: ['', Validators.required],
      ControladoraControl:['']
    })
  }

  InicializarFiltros():void{
    this.FormClienteControlador.get('clienteControl').valueChanges
    .pipe ( takeUntil(this.unsubscribe))
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
    
        this.FormClienteControlador.get('ControladoraControl').valueChanges
        .pipe ( takeUntil(this.unsubscribe))
            .subscribe(
              (data:string)=>{
                if ((data != null && data != undefined) && data.length > 1) {
                  this.optionsControladora = []
                  this._servicioControlador.Listar(data.trim())
                  .subscribe((data:MensajeResponse)=>{
                    if(data.retorno)
                    this.optionsControladora = data.objetoRetorno.controladoras as ControladoraRequest []
                  })
                }
              }
            )
  }

  resetInputs():void{
    this.ControladorInput.nativeElement.value = ''
    this.FormClienteControlador.get('ControladoraControl').setValue(null);
 }

  remove(control: ControladoraRequest): void {
    this.Controladoras = this.Controladoras.filter((data:ControladoraRequest) => data.idControladora != control.idControladora)
    this.resetInputs()
  }

  Eliminar(control:ControladoraRequest):void{
    this.ListaAsignar = new MatTableDataSource(this.ListaAsignar.data.filter( data=> data.idControladora != control.idControladora))
  }

  SeleccionControl(event: MatAutocompleteSelectedEvent): void {
    if(!this.Controladoras.find((data:ControladoraRequest) => data.idControladora == event.option.value.idControladora)){
      this.Controladoras.push(event.option.value as ControladoraRequest);
      this.resetInputs()
    }
  }

  MostarClienteControlador(event: MatAutocompleteSelectedEvent):void {
    let clienteControlador = Number(event.option.id)
    this._servicioCliente.ConsultarClienteControladora(clienteControlador)
          .subscribe((data:MensajeResponse) => {
            if(data.retorno){
              this.ListaAsignar = new MatTableDataSource(data.objetoRetorno.controladoras)
            }
          })
  }

  AgregarCliente():void{
    if(this.FormClienteControlador.valid && this.Controladoras.length > 0){
      this.ListaAsignar.data.forEach( 
        data => (this.Controladoras.find(
          filtro=> filtro.nombre==data.nombre) == null)?this.Controladoras.push(data):null) // merge con los datos del grid y inputTag
      this.ListaAsignar = new MatTableDataSource(this.Controladoras)
      this.Controladoras=[]
      this.VerBoton = false
      this.mensajeModal.info("Se agregaron tags", "Información")
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }

  GrabarClienteControladora(): void{
    if(this.FormClienteControlador.valid && this.ListaAsignar.data.length > 0){
      this.GrabarClienteControlador.cliente = this.optionsCliente[0]
      this.GrabarClienteControlador.controladoras = this.ListaAsignar.data
      this._servicioCliente.AsignarControlador(this.GrabarClienteControlador)
          .subscribe((data:MensajeResponse) =>{
            if(data.retorno){
              this.mensajeModal.success("Exitoso", "Registro exitoso")
              this.FormClienteControlador.reset()
              this.Controladoras = []
              this.ListaAsignar = new MatTableDataSource()
              this.VerBoton = true
            }
          })
    }else{
      this.mensajeModal.info("El formulario es inválido","Información")
    }
  }
  
}

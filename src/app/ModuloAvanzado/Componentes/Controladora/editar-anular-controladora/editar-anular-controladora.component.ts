import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteRequest } from 'src/app/ModuloAvanzado/Modelos/ClienteRequest';
import { ControladoraRequest } from 'src/app/ModuloAvanzado/Modelos/ControladoraRequest';
import { ControladoraService } from 'src/app/ModuloAvanzado/Servicios/controladora.service';
import { DialogoYesNoComponent } from 'src/app/ModuloPrincipal/Componentes/dialogo-yes-no/dialogo-yes-no.component';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { DataService } from 'src/app/ModuloPrincipal/Servicios/data.service';
import { DialogoControladoraComponent } from '../dialogo-controladora/dialogo-controladora.component';

@Component({
  selector: 'app-editar-anular-controladora',
  templateUrl: './editar-anular-controladora.component.html'
})
export class EditarAnularControladoraComponent implements OnInit {

  ListaControladora:Array<ControladoraRequest> 
  displayedColumns = ['Nombre','Editar','Eliminar']
  BuscarControladora:string=''

  constructor( 
    private dialogo:MatDialog,
    private _Controladorservice:ControladoraService,
    private _dataService: DataService,
    private mensajeModal: ToastrService
    ) { 
  }

  ngOnInit(): void {
    this.ListaControladora = new Array()
  }

  Editar(element:ControladoraRequest):void{
   this.dialogo.open(DialogoControladoraComponent, { data: element })
                .afterClosed()
                  .subscribe((data:string) => this.dialogo.closeAll())
  }

  Eliminar(element:ControladoraRequest):void{
   this.dialogo.open(DialogoYesNoComponent, {data:{ titulo: "Controladora", nombre:element.Nombre }})
                .afterClosed()
                    .subscribe((data:string) => {
                      if(data){
                        this._Controladorservice.Anular(Number(element.Codigo))
                            .subscribe((data:MensajeResponse) =>{
                              if(data.retorno){                                                 
                                this._dataService.Cargando = true
                                this.mensajeModal.success("Anulación exitosa","Exitoso")
                                }
                              }, err =>{
                                this._dataService.Cargando = true
                                this.mensajeModal.error("Error en la consulta", "Error")
                              })
                        }
                        else this.dialogo.closeAll();
         })
 }
  BuscarControladoras():void{
    if(this.BuscarControladora.match(/^[0-9]+$/)){
      this._dataService.Cargando = false
      var idCliente = Number(this.BuscarControladora)
      this._Controladorservice.Consultar(idCliente)
                            .subscribe( (data:MensajeResponse) =>{
                              if(data.retorno){
                              this.ListaControladora = data.objetoRetorno as ControladoraRequest[]
                              }
                              this._dataService.Cargando = true
                              this.mensajeModal.success("Busqueda exitosa","Exitoso")
                            }, err =>{
                              this._dataService.Cargando = true
                              this.mensajeModal.error("Error en la consulta", "Error")
                            })
    }else{
      this._Controladorservice.Listar(this.BuscarControladora)
                            .subscribe( (data:MensajeResponse) =>{
                              if(data.retorno){
                                this.ListaControladora = data.objetoRetorno as ControladoraRequest[]
                                this._dataService.Cargando = true
                                this.mensajeModal.success("Busqueda exitosa","Exitoso")
                              }
                              }, err =>{
                                this._dataService.Cargando = true
                                this.mensajeModal.error("Error en la consulta", "Error")
                              })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ClienteRequest } from 'src/app/ModuloAvanzado/Modelos/ClienteRequest';
import { ClienteService } from 'src/app/ModuloAvanzado/Servicios/cliente.service';
import { DialogoYesNoComponent } from 'src/app/ModuloPrincipal/Componentes/dialogo-yes-no/dialogo-yes-no.component';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { DataService } from 'src/app/ModuloPrincipal/Servicios/data.service';
import { DialogoEditarComponent } from '../dialogo-editar/dialogo-editar.component';

@Component({
  selector: 'app-editar-anular-cliente',
  templateUrl: './editar-anular-cliente.component.html'
})
export class EditarAnularClienteComponent implements OnInit {

  ListaCliente:MatTableDataSource<ClienteRequest>
  displayedColumns = ['Nombre','Editar','Eliminar']
  BuscarCliente:string=''

  constructor(private dialogo:MatDialog,
              private _clienteservice: ClienteService,
              private mensajeModal: ToastrService) { 
  }

  ngOnInit(): void {
    this.ListaCliente = new MatTableDataSource()
  }

  Editar(element:ClienteRequest):void{
   this.dialogo.open(DialogoEditarComponent, { data: element })
                .afterClosed()
                  .subscribe( data => this.dialogo.closeAll())
  }

  Eliminar(element:ClienteRequest):void{
   this.dialogo.open(DialogoYesNoComponent, {data:{ titulo: "Cliente", nombre:element.nombre}})
                .afterClosed()
                    .subscribe((data:string) => {
                      if(data=="true"){
                        this._clienteservice.Anular(Number(element.idCliente))
                                              .subscribe((data:MensajeResponse) =>{
                                                if(data.retorno){                                                 
                                                  this.mensajeModal.success("Anulación exitosa","Exitoso")
                                                  }
                                                }, err =>{
                                                  this.mensajeModal.error("Error en la consulta", "Error")
                                                })
                      }else{
                        this.dialogo.closeAll()
                      }
                    })
  }

  BuscarClientes():void{
    if(this.BuscarCliente.match(/^[0-9]+$/)){
      var idCliente = Number(this.BuscarCliente)
      this._clienteservice.Consultar(idCliente)
                            .subscribe( (data:MensajeResponse) =>{
                              if(data.retorno){
                                let lista = data.objetoRetorno.clientes as ClienteRequest []
                                this.ListaCliente = new MatTableDataSource(lista)
                                this.mensajeModal.success("Busqueda exitosa","Exitoso")
                              }
                            }, err =>{
                              this.mensajeModal.error( err.error.mensajeRetorno, "Error")
                            })
    }else{
      this._clienteservice.Listar(this.BuscarCliente)
                            .subscribe( (data:MensajeResponse) =>{
                              if(data.retorno){
                                let lista = data.objetoRetorno as ClienteRequest[]
                                this.ListaCliente = new MatTableDataSource(lista)
                                this.mensajeModal.success("Busqueda exitosa","Exitoso")
                              }
                              }, err =>{
                                this.mensajeModal.error( err.error.mensajeRetorno, "Error")
                              })
    }   
  }
}

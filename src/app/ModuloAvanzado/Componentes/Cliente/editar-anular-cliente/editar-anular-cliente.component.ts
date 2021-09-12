import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ClienteRequest } from 'src/app/ModuloAvanzado/Modelos/ClienteRequest';
import { ClienteService } from 'src/app/ModuloAvanzado/Servicios/cliente.service';
import { DialogoYesNoComponent } from 'src/app/ModuloPrincipal/Componentes/dialogo-yes-no/dialogo-yes-no.component';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { DialogoEditarComponent } from '../dialogo-editar/dialogo-editar.component';

@Component({
  selector: 'app-editar-anular-cliente',
  templateUrl: './editar-anular-cliente.component.html'
})
export class EditarAnularClienteComponent implements OnInit {

  ListaCliente:MatTableDataSource<ClienteRequest>
  displayedColumns = ['Nombre','Editar','Eliminar']
  BuscarCliente:string=''
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private dialogo:MatDialog,
              private _clienteservice: ClienteService,
              private mensajeModal: ToastrService) { 
  }

  ngOnInit(): void {
  }

  inicializarPaginator() {
    this.ListaCliente.paginator = this.paginator;
  }

  Editar(element:ClienteRequest):void{
   this.dialogo.open(DialogoEditarComponent, { data: element })
                .afterClosed()
                  .subscribe( (data:string) => {
                    this.dialogo.closeAll()
                    if(data == "true"){
                      this.ListaCliente = new MatTableDataSource()
                      this.inicializarPaginator()
                    }
                  })
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
                                                  this.ListaCliente = new MatTableDataSource()
                                                  this.inicializarPaginator()
                                                  }
                                                })
                      }
                        this.dialogo.closeAll()
                    })
  }

  BuscarClientes():void{
    let ServicioCliente: Observable<MensajeResponse>

    if(this.BuscarCliente.match(/^[0-9]+$/)){
      let idCliente = Number(this.BuscarCliente)
    ServicioCliente = this._clienteservice.Consultar(idCliente)
    }else{
    ServicioCliente = this._clienteservice.Listar(this.BuscarCliente)
    }   
    ServicioCliente.subscribe( 
          (data:MensajeResponse) =>{
            if(data.retorno){
              let lista = data.objetoRetorno.clientes as ClienteRequest[]
              this.ListaCliente = new MatTableDataSource(lista)
              this.inicializarPaginator()
              this.mensajeModal.success("Busqueda exitosa","Exitoso")
            }})
  }
}

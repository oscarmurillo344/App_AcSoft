import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ControladoraRequest } from 'src/app/ModuloAvanzado/Modelos/ControladoraRequest';
import { ControladoraService } from 'src/app/ModuloAvanzado/Servicios/controladora.service';
import { DialogoYesNoComponent } from 'src/app/ModuloPrincipal/Componentes/dialogo-yes-no/dialogo-yes-no.component';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { DialogoControladoraComponent } from '../dialogo-controladora/dialogo-controladora.component';

@Component({
  selector: 'app-editar-anular-controladora',
  templateUrl: './editar-anular-controladora.component.html'
})
export class EditarAnularControladoraComponent implements OnInit {

  ListaControladora:MatTableDataSource<ControladoraRequest> 
  displayedColumns = ['Nombre','Editar','Eliminar']
  BuscarControladora:string=''
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( 
    private dialogo:MatDialog,
    private _Controladorservice:ControladoraService,
    private mensajeModal: ToastrService
    ) { 
  }

  ngOnInit(): void {  }

  inicializarPaginator() {
    this.ListaControladora.paginator = this.paginator;
  }

  Editar(element:ControladoraRequest):void{
   this.dialogo.open(DialogoControladoraComponent, { data: element })
                .afterClosed()
                  .subscribe((msm:string) => {
                    this.dialogo.closeAll()
                    if(msm == "true"){
                      this.ListaControladora = new MatTableDataSource()
                      this.inicializarPaginator()
                    }
                  })
  }
 
  Eliminar(element:ControladoraRequest):void{
   this.dialogo.open(DialogoYesNoComponent, {data:{ titulo: "Controladora", nombre:element.nombre }})
                .afterClosed()
                    .subscribe((data:string) => {
                      if(data == "true"){
                        this._Controladorservice.Anular(Number(element.idControladora))
                            .subscribe((data:MensajeResponse) =>{
                              if(data.retorno){                                                 
                                this.mensajeModal.success("Anulación exitosa","Exitoso")
                                this.ListaControladora = new MatTableDataSource()
                                this.inicializarPaginator()
                              }
                              })
                        }
                        this.dialogo.closeAll();
         })
 }
  BuscarControladoras():void{
    let ServicioControladora:Observable<MensajeResponse>
        if(this.BuscarControladora.match(/^[0-9]+$/)){
          var idCliente = Number(this.BuscarControladora)
          ServicioControladora = this._Controladorservice.Consultar(idCliente)                      
        }else{
          ServicioControladora = this._Controladorservice.Listar(this.BuscarControladora)                      
        }
        ServicioControladora
        .subscribe( (data:MensajeResponse) =>{
          if(data.retorno){
            let lista = data.objetoRetorno.controladoras as ControladoraRequest[]
            this.ListaControladora = new MatTableDataSource(lista)
            this.inicializarPaginator()
            this.mensajeModal.success("Busqueda exitosa","Exitoso")
          }})
  }
}

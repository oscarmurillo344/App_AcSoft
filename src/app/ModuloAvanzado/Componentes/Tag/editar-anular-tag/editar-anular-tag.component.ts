import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TagRequest } from 'src/app/ModuloAvanzado/Modelos/TagRequest';
import { TagService } from 'src/app/ModuloAvanzado/Servicios/tag.service';
import { DialogoYesNoComponent } from 'src/app/ModuloPrincipal/Componentes/dialogo-yes-no/dialogo-yes-no.component';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { DialogoTagComponent } from '../dialogo-tag/dialogo-tag.component';

@Component({
  selector: 'app-editar-anular-tag',
  templateUrl: './editar-anular-tag.component.html'
})
export class EditarAnularTagComponent implements OnInit {

  ListaTag:MatTableDataSource<TagRequest> 
  displayedColumns = ['Nombre','Editar','Eliminar']
  BuscarTag:string=''
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
     private dialogo:MatDialog,
     private mensajeModal: ToastrService,
     private _servicioTag:TagService) { 
  }

  ngOnInit(): void {  }

  inicializarPaginator() {
    this.ListaTag.paginator = this.paginator;
  }

  Editar(element:TagRequest):void{
   this.dialogo.open(DialogoTagComponent, { data: element })
                .afterClosed()
                  .subscribe((msm:string) => {
                    this.dialogo.closeAll()
                    if(msm == "true"){
                      this.ListaTag = new MatTableDataSource()
                      this.inicializarPaginator()
                    }
                  })
  }

  Eliminar(element:TagRequest):void{
   this.dialogo.open(DialogoYesNoComponent, {data:{ titulo: "Tag", nombre:element.nombre }})
                .afterClosed()
                    .subscribe((data:string) => {
                      if(data == "true"){
                        this._servicioTag.Anular(Number(element.idTag))
                            .subscribe((data:MensajeResponse) =>{
                              if(data.retorno){                                                 
                                this.ListaTag = new MatTableDataSource()
                                this.inicializarPaginator()
                                this.mensajeModal.success("Anulación exitosa","Exitoso")
                                }
                              })
                        }
                        this.dialogo.closeAll();
                    })
  }

  TagBuscar():void {
    let ServicioTag:Observable<MensajeResponse>
    if(this.BuscarTag.match(/^[0-9]+$/)){
      let idTag = Number(this.BuscarTag)
     ServicioTag = this._servicioTag.Consultar(idTag)
    }else{
     ServicioTag = this._servicioTag.Listar(this.BuscarTag)
    }
    ServicioTag 
        .subscribe( (data:MensajeResponse) =>{
          if(data.retorno){
          let lista = data.objetoRetorno.tags as TagRequest[]
          this.ListaTag = new MatTableDataSource(lista)
          this.inicializarPaginator()
          this.mensajeModal.success("Busqueda exitosa","Exitoso")
          }
        })
  }
}

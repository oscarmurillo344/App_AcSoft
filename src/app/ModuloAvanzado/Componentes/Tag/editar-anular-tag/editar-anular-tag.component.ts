import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
     private dialogo:MatDialog,
     private mensajeModal: ToastrService,
     private _servicioTag:TagService) { 
  }

  ngOnInit(): void {
    this.ListaTag = new MatTableDataSource()
  }

  Editar(element:TagRequest):void{
   this.dialogo.open(DialogoTagComponent, { data: element })
                .afterClosed()
                  .subscribe((data:string) => this.dialogo.closeAll())
  }

  Eliminar(element:TagRequest):void{
   this.dialogo.open(DialogoYesNoComponent, {data:{ titulo: "Tag", nombre:element.nombre }})
                .afterClosed()
                    .subscribe((data:string) => {
                      if(data == "true"){
                        this._servicioTag.Anular(Number(element.idTag))
                            .subscribe((data:MensajeResponse) =>{
                              if(data.retorno){                                                 
                                this.mensajeModal.success("Anulación exitosa","Exitoso")
                                }
                              }, err =>{
                                this.mensajeModal.error("Error en la consulta", "Error")
                              })
                        }
                        else this.dialogo.closeAll();
                    })
  }

  TagBuscar():void {
    if(this.BuscarTag.match(/^[0-9]+$/)){
      let idTag = Number(this.BuscarTag)
      this._servicioTag.Consultar(idTag)
      .subscribe( (data:MensajeResponse) =>{
        if(data.retorno){
        let lista = data.objetoRetorno.tags as TagRequest[]
        this.ListaTag = new MatTableDataSource(lista)
        }
        this.mensajeModal.success("Busqueda exitosa","Exitoso")
      }, () =>{
        this.mensajeModal.error("Error en la consulta", "Error")
      })
    }else{
      this._servicioTag.Listar(this.BuscarTag)
      .subscribe( (data:MensajeResponse) =>{
        if(data.retorno){
        let lista = data.objetoRetorno.tags as TagRequest[]
        this.ListaTag = new MatTableDataSource(lista)
        }
        this.mensajeModal.success("Busqueda exitosa","Exitoso")
      }, () =>{
        this.mensajeModal.error("Error en la consulta", "Error")
      })
    }
  }

}

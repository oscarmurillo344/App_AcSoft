import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagRequest } from 'src/app/ModuloAvanzado/Modelos/tag-request';
import { DialogoYesNoComponent } from 'src/app/ModuloPrincipal/Componentes/dialogo-yes-no/dialogo-yes-no.component';
import { DialogoTagComponent } from '../dialogo-tag/dialogo-tag.component';

@Component({
  selector: 'app-editar-anular-tag',
  templateUrl: './editar-anular-tag.component.html'
})
export class EditarAnularTagComponent implements OnInit {

  ListaTag:Array<TagRequest> 
  displayedColumns = ['Nombre','Editar','Eliminar']
  BuscarTag:string=''

  constructor( private dialogo:MatDialog) { 
  }

  ngOnInit(): void {
    this.ListaTag = new Array()
  }

  Editar(element:TagRequest):void{
   this.dialogo.open(DialogoTagComponent, { data: element })
                .afterClosed()
                  .subscribe((data:string) => {
                      console.log(data)
                })
  }

  Eliminar(element:TagRequest):void{
   this.dialogo.open(DialogoYesNoComponent, {data:{ titulo: "Tag", nombre:element.Nombre }})
                .afterClosed()
                    .subscribe((data:string) => {
                      console.log(data)
                    })
  }

  TagBuscar():void {
    if(this.BuscarTag.match(/^[0-9]+$/)){
      console.log("es numero")
    }else{
      console.log("es texto")
    }
  }

}

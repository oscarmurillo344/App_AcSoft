import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Servicios/data.service';
import { StorageService } from '../../Servicios/storage.service';
import { MatAccordion } from '@angular/material/expansion';
import { SeguridadService } from 'src/app/ModuloSeguridad/Servicios/seguridad.service';
import { Formulario } from 'src/app/ModuloSeguridad/Modelos/Formulario';
import { VistaFormulario } from 'src/app/ModuloSeguridad/Modelos/VistaFormulario';
import { DetalleVista } from 'src/app/ModuloSeguridad/Modelos/DetalleVista';

@Component({
  selector: 'app-menu-nav-bar',
  templateUrl: './menu-nav-bar.component.html',
  styleUrls: ['./menu-nav-bar.component.css']
})
export class MenuNavBarComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  ListaItem: VistaFormulario[]=[]
  formularios: Formulario[]

constructor(private router:Router,
            public _dataservice: DataService,
            private sesion:StorageService,
            public __seguridad:SeguridadService) { }

  ngOnInit(): void {
    this.__seguridad.EventoItemNavBar
        .subscribe( (data:string) => {
          this.llenarListaModulosNav(data)
        })

  if(!this.sesion.SesionStorageObtener("Usuario")){
    this._dataservice.VerBarraLateral = false
    this._dataservice.VerCabecera = false
  }else{
    this.router.navigate(['principal'])
  }
}

llenarListaModulosNav(data:string){
  this.formularios = this.sesion.SesionStorageObtener(data) as Formulario[]
         this.ListaItem = []
         for(var index=0; index < this.formularios.length;){

              this.ListaItem.push(new VistaFormulario( this.formularios[index].idFormulario,
                this.formularios[index].nombre,
                this.formularios[index].carpeta,
                this.formularios[index].modulo,
                this.formularios[index].activo))
            var numero = this.ListaItem.length-1
           while (index < this.formularios.length && this.ListaItem[numero].modulo == this.formularios[index].modulo ){
                    this.ListaItem[numero].detalle.push(new DetalleVista(
                    this.formularios[index].nombreFisico,
                    this.formularios[index].descripcion))
                      index++
           }
         }        
}
  logOut():void{
    this.sesion.SesionStorageLimpiar()
    this._dataservice.VerCabecera = false
    this._dataservice.VerBarraLateral = false
    this.router.navigate(['seguridad/login'])
  }

}

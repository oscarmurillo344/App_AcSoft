import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { DataService } from '../../Servicios/data.service';
import { StorageService } from '../../Servicios/storage.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Usuario } from 'src/app/ModuloSeguridad/Modelos/Usuario';
import { SeguridadService } from 'src/app/ModuloSeguridad/Servicios/seguridad.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent implements OnInit, OnDestroy{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(min-width: 800px)')
  .pipe(
        map(result => result.matches),
            shareReplay());
  usuario:Usuario
  private unsubcribe = new Subject<void>()

  constructor(private breakpointObserver: BreakpointObserver,
              public _dataservice: DataService,
              private sesion:StorageService,
              private __seguridad:SeguridadService) { }
 
  ngOnDestroy(): void {
    this.unsubcribe.next();
    this.unsubcribe.complete();
  }

  ngOnInit(): void {
    setTimeout(()=>{
      if(this.sesion.SesionStorageObtener("Usuario")){
        this.usuario = this.sesion.SesionStorageObtener("Usuario") as Usuario
        this._dataservice.NombreUsuario = this.usuario.nombreUsuario 
        this.isHandset$.pipe( takeUntil(this.unsubcribe) )
        .subscribe( (data:boolean) =>this._dataservice.VerBarraLateral = data)    
          } 
      if(this.sesion.SesionStorageObtener("Formularios")){
            this.__seguridad.EventoItemNavBar.emit("Formularios")
          }
    }) 
  }

}
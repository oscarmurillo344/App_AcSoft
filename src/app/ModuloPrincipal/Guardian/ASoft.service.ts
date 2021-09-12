import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Formulario } from 'src/app/ModuloSeguridad/Modelos/Formulario';
import { StorageService } from '../Servicios/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ASoftService implements CanActivate {

  constructor(
    private route:Router,
    private local:StorageService
  ) { }

  canActivate(routes: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const Formularios=this.local.LocalStorageObtener("Formularios") as Formulario[]
    let ruta = this.route.url
    if(!Formularios.filter(data=>data.nombreFisico==ruta)){
      this.route.navigate(['/principal']);
      return false;
    }
    return true;
  }
}

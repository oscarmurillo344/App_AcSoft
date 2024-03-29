import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

   private _VerCabecera: boolean = true
   private _VerBarraLateral: boolean = true
   private _NombreUsuario:string = "Default";
  
  constructor() { }

  public get VerCabecera(): boolean{
    return this._VerCabecera
  }

  public set VerCabecera(v:boolean){
    this._VerCabecera = v
  }

  public get VerBarraLateral(): boolean{
    return this._VerBarraLateral
  }

  public set VerBarraLateral(v:boolean){
    this._VerBarraLateral = v
  }
  public get NombreUsuario(): string{
    return this._NombreUsuario
  }

  public set NombreUsuario(v:string){
    this._NombreUsuario = v
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  LocalStorageObtener(key:string):any{
    try{
      return JSON.parse(localStorage.getItem(key)?localStorage.getItem(key):"")
    }catch(e){
      return null
    }
  }

  LocalStorageSetear(key:string,Data:any):any{
    localStorage.setItem(key,JSON.stringify(Data));
  }

  LocalStorageLimpiar(){
    localStorage.clear()
  }

  SesionStorageObtener(key:string):any{
    try{
      return JSON.parse(sessionStorage.getItem(key)?sessionStorage.getItem(key):"")
    }catch(e){
      return null
    }
  }

  SesionStorageSetear(key:string,Data:any):any{
    sessionStorage.setItem(key,JSON.stringify(Data));
  }
  SesionStorageLimpiar(){
    sessionStorage.clear()
  }
}

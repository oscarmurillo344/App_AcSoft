import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading$ = new Subject<boolean>()

  Mostrar():void{
    this.isLoading$.next(true)
  }
  
  Ocultar():void{
    this.isLoading$.next(false)
  }
  
}

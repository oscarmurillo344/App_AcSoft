import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataService } from '../Servicios/data.service';
import { catchError, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../Servicios/loading.service';
const Estacion = window.location.host

@Injectable()
export class InterceptorRequestInterceptor implements HttpInterceptor {

  constructor(
    private _dataService: DataService,
    private spinner: LoadingService,    
    public MensajeModal: ToastrService,
    ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.Mostrar()
    let respestaCopy = req;
    if(respestaCopy.method == "POST"){
      respestaCopy = req.clone({
        setHeaders: {
          "usuario" : this._dataService.NombreUsuario,
          "estacion": Estacion
        }
      })
    }
    return next.handle(respestaCopy)
              .pipe(
                finalize(()=> this.spinner.Ocultar()),
                catchError((err:any)=>{
                  if(err.error?.mensajeRetorno)
                  this.MensajeModal.error(err.error.mensajeRetorno,"Error")
                  else 
                  this.MensajeModal.error("Error en la consulta","Error")
                  return throwError(err)
                }));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { environment } from 'src/environments/environment.prod';
import { ControladoraRequest } from '../Modelos/ControladoraRequest';

const PathControladora = 'acsoft/api/avanzado/controladora/v1/';
const Url_Controladora = `${environment.UrlLocal + environment.PuertoClientelocal + PathControladora}`;

@Injectable({
  providedIn: 'root'
})
export class ControladoraService {

  constructor(private http: HttpClient) { }

  public Grabar(controladora:ControladoraRequest):Observable<MensajeResponse>{
    return this.http.post<MensajeResponse>( Url_Controladora +'grabar', controladora);
  }

  public Consultar(idCliente:number):Observable<MensajeResponse>{
    return this.http.get<MensajeResponse>( Url_Controladora +'consultar/'+ idCliente)
  }

  public Listar(nombre:string):Observable<MensajeResponse>{
    return this.http.get<MensajeResponse>( Url_Controladora +'listar/'+ nombre)
  }

  public Anular(idCliente:number):Observable<MensajeResponse>{
    return this.http.put<MensajeResponse>( Url_Controladora +'anular/'+ idCliente, {})
  }
}

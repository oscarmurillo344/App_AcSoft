import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { environment } from 'src/environments/environment.prod';
import { ClienteRequest } from '../Modelos/ClienteRequest';

const Url_Cliente = `${environment.UrlLocal + environment.PuertoClientelocal + 
  'acsoft/api/avanzado/cliente/v1/'}`;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public Grabar(cliente:ClienteRequest):Observable<MensajeResponse>{
    let params = new URLSearchParams()
    params.append("usuario", "")
    params.append("estacion", "" )
    console.log(params.toString())
    return this.http.post<MensajeResponse>( Url_Cliente +'grabar/?'+params.toString(), cliente);
  }

  public Consultar(idCliente:number):Observable<MensajeResponse>{
    return this.http.get<MensajeResponse>( Url_Cliente +'consultar/'+ idCliente)
  }

  public Listar(nombre:string):Observable<MensajeResponse>{
    return this.http.get<MensajeResponse>( Url_Cliente +'listar/'+ nombre)
  }

  public Anular(idCliente:number):Observable<MensajeResponse>{
    return this.http.put<MensajeResponse>( Url_Cliente +'anular/'+ idCliente, {})
  }
}

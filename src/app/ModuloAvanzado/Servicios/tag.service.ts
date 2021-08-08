import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { environment } from 'src/environments/environment.prod';
import { TagRequest } from '../Modelos/tag-request';

const Url_Tag = `${environment.UrlLocal + environment.PuertoClientelocal + 
  'acsoft/api/avanzado/tag/v1/'}`;

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  public Grabar(controladora:TagRequest):Observable<MensajeResponse>{
    let params = new URLSearchParams()
    params.append("usuario", "")
    params.append("estacion", "" )
    console.log(params.toString())
    return this.http.post<MensajeResponse>( Url_Tag +'grabar/?'+params.toString(), controladora);
  }

  public Consultar(idCliente:number):Observable<MensajeResponse>{
    return this.http.get<MensajeResponse>( Url_Tag +'consultar/'+ idCliente)
  }

  public Listar(nombre:string):Observable<MensajeResponse>{
    return this.http.get<MensajeResponse>( Url_Tag +'listar/'+ nombre)
  }

  public Anular(idCliente:number):Observable<MensajeResponse>{
    return this.http.put<MensajeResponse>( Url_Tag +'anular/'+ idCliente, {})
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { DataService } from 'src/app/ModuloPrincipal/Servicios/data.service';
import { environment } from 'src/environments/environment.prod';
import { ClienteRequest } from '../Modelos/ClienteRequest';
import { GrabarClienteControladoraRequest } from '../Modelos/GrabarClienteControladoraRequest';
import { GrabarClienteTagRequest } from '../Modelos/GrabarClienteTagRequest';

const Url_Cliente = `${environment.UrlLocal + environment.PuertoClientelocal + 
  'acsoft/api/avanzado/cliente/v1/'}`;
const Estacion = window.location.host

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
    ) { }

  public Grabar(cliente:ClienteRequest):Observable<any>{
   
    return this.http.post<any>( Url_Cliente +'grabar', cliente);
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

  public AsignarControlador(clienteControlador:GrabarClienteControladoraRequest):Observable<MensajeResponse>{
    return this.http.post<MensajeResponse>( Url_Cliente +'grabarclientecontroladora', clienteControlador)
  }

  public AsignarTags(clienteTags:GrabarClienteTagRequest):Observable<MensajeResponse>{
    return this.http.post<MensajeResponse>( Url_Cliente +'grabarclientetag', clienteTags)
  }

  public ConsultarClienteTag(idCliente:number):Observable<MensajeResponse>{
    return this.http.get<MensajeResponse>( Url_Cliente +'consultarclientetag/'+idCliente)
  }

  public ConsultarClienteControladora(idCliente:number):Observable<MensajeResponse>{
    return this.http.get<MensajeResponse>( Url_Cliente +'consultarclientecontroladora/'+idCliente)
  }

}


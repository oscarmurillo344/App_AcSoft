import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeResponse } from 'src/app/ModuloPrincipal/Modelos/MensajeResponse';
import { environment } from 'src/environments/environment.prod';
import { CambiarContrasenaRequest } from '../Modelos/CambiarContrasenaRequest';
import { UsuarioLoginRequest } from '../Modelos/UsuarioLoginRequest';


const Url_seguridad = `${environment.UrlLocal + environment.PuertoUsuariolocal + 
                          'acsoft/api/seguridad/usuario/v1/' }`;

@Injectable({
  providedIn: 'root'
})

export class SeguridadService {

  EventoItemNavBar = new EventEmitter<string>()
    
  constructor(private http: HttpClient) { }

  public Autenticarse(usuarioLogin:UsuarioLoginRequest):Observable<MensajeResponse>{
    let params = new HttpParams()
    .append("nombreUsuario", usuarioLogin.nombreUsuario)
    .append("contrasena", usuarioLogin.contrasena )
    return this.http.post<MensajeResponse>(Url_seguridad+'autenticar', {}, { params:params });
  }

  public CambiarContraseña(usuarioCambiar:CambiarContrasenaRequest):Observable<MensajeResponse>{
    let params = new HttpParams()
    .append("usuario", usuarioCambiar.usuario)
    .append("idUsuario", usuarioCambiar.idUsuario.toString())
    .append("estacion", usuarioCambiar.estacion)
    .append("contrasena", usuarioCambiar.contrasena)
    return this.http.post<MensajeResponse>(Url_seguridad+'cambiarcontrasena',{ params: params });
  }
}

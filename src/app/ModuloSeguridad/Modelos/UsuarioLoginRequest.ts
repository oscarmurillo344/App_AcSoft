export class UsuarioLoginRequest {

    nombreUsuario:string
    contrasena:string

    constructor(nombreusuario:string,
                password:string){
        this.nombreUsuario = nombreusuario
        this.contrasena = password
    }
}
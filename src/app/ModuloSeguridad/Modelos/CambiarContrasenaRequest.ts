export class CambiarContrasenaRequest{
    
    usuario:string
    estacion:string
    idUsuario:number
    contrasena:string

    constructor(usuario:string,
        estacion:string,
        idUsuario:number,
        contrasena:string){
            this.usuario=usuario
            this.estacion=estacion
            this.idUsuario=idUsuario
            this.contrasena=contrasena
    }

}
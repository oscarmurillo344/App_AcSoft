export class Formulario {
    
    idFormulario:number
    nombre:string
    carpeta: string
    modulo:string
    nombreFisico:string
    descripcion:string
    activo: boolean

    constructor( idFormulario:number,
        nombre:string,
        carpeta: string,
        modulo:string,
        activo: boolean){
            this.idFormulario=idFormulario
            this.nombre=nombre
            this.carpeta=carpeta
            this.modulo=modulo
            this.activo=activo

    }
}
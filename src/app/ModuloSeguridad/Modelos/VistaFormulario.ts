import { DetalleVista } from "./DetalleVista"

export class VistaFormulario {

    idFormulario:number
    nombre:string
    carpeta: string
    modulo:string
    activo: boolean
    detalle: DetalleVista[]=[]

    constructor(idFormulario:number,
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
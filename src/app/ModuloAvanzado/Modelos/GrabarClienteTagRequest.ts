import { ClienteRequest } from "./ClienteRequest";
import { TagRequest } from "./TagRequest";

export class GrabarClienteTagRequest {

    cliente:ClienteRequest
    tags:Array<TagRequest>

    constructor(){
        this.tags = []
    }
}

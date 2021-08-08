import { NgModule } from '@angular/core';

import { AvanzadoRoutingModule } from './modulo-avanzado-routing.module';

import { CrearClienteComponent } from './Componentes/Cliente/crear-cliente/crear-cliente.component';
import { EditarAnularClienteComponent } from './Componentes/Cliente/editar-anular-cliente/editar-anular-cliente.component';
import { PrincipalClienteComponent } from './Componentes/Cliente/principal-cliente/principal-cliente.component';
import { DialogoEditarComponent } from './Componentes/Cliente/dialogo-editar/dialogo-editar.component';

import { CrearControladoraComponent } from './Componentes/Controladora/crear-controladora/crear-controladora.component';
import { PrincipalControladoraComponent } from './Componentes/Controladora/principal-controladora/principal-controladora.component';
import { EditarAnularControladoraComponent } from './Componentes/Controladora/editar-anular-controladora/editar-anular-controladora.component';
import { DialogoControladoraComponent } from './Componentes/Controladora/dialogo-controladora/dialogo-controladora.component';

import { PrincipalTagComponent } from './Componentes/Tag/principal-tag/principal-tag.component';
import { CrearTagComponent } from './Componentes/Tag/crear-tag/crear-tag.component';
import { EditarAnularTagComponent } from './Componentes/Tag/editar-anular-tag/editar-anular-tag.component';
import { DialogoTagComponent } from './Componentes/Tag/dialogo-tag/dialogo-tag.component';
import { CompartidoModule } from '../ModuloCompartido/compartido.module';
import { ClienteService } from './Servicios/cliente.service';
import { ControladoraService } from './Servicios/controladora.service';
import { TagService } from './Servicios/tag.service';



@NgModule({
  declarations: [
                 PrincipalClienteComponent, 
                 CrearClienteComponent, 
                 EditarAnularClienteComponent,
                 DialogoEditarComponent,
                 PrincipalControladoraComponent,
                 CrearControladoraComponent,
                 EditarAnularControladoraComponent,
                 DialogoControladoraComponent,
                 PrincipalTagComponent,
                 CrearTagComponent,
                 EditarAnularTagComponent,
                 DialogoTagComponent
          ],
  imports: [
    CompartidoModule,
    AvanzadoRoutingModule
  ],
  exports:[
            PrincipalClienteComponent, 
            CrearClienteComponent, 
            EditarAnularClienteComponent,
            DialogoEditarComponent,
            PrincipalControladoraComponent,
            CrearControladoraComponent,
            EditarAnularControladoraComponent,
            DialogoControladoraComponent,
            PrincipalTagComponent,
            CrearTagComponent,
            EditarAnularTagComponent,
            DialogoTagComponent
          ],
    providers:[
      ClienteService,
      ControladoraService,
      TagService
    ]
})
export class AvanzadoModule { }

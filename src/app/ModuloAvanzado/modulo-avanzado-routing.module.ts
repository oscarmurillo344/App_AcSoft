import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalClienteComponent } from './Componentes/Cliente/principal-cliente/principal-cliente.component';
import { PrincipalControladoraComponent } from './Componentes/Controladora/principal-controladora/principal-controladora.component';
import { PrincipalTagComponent } from './Componentes/Tag/principal-tag/principal-tag.component';

const routes: Routes = [{
   path: '',  
   children: [
     { path: 'cliente', component: PrincipalClienteComponent},
     { path: 'controladora', component: PrincipalControladoraComponent},
     { path: 'tag', component: PrincipalTagComponent},
     { path: '', redirectTo: 'cliente', pathMatch: 'full' },
     { path: '**', redirectTo: 'cliente', pathMatch: 'full'}
      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvanzadoRoutingModule { }

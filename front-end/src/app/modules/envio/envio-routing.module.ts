import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { EnvioReiniciarFormComponent } from './reiniciar/envio-reiniciar-form/envio-reiniciar-form.component';
import { EnvioForcarComponent } from './forcar/envio-forcar/envio-forcar.component';
import { EnvioUsuarioListComponent } from './envio-usuario-list/envio-usuario-list.component';
import { EnvioPlanoEntregaListComponent } from './envio-plao-entrega-list/envio-plano-entrega-list.component';

const routes: Routes = [
  { 
    path: 'reiniciar',
    component: EnvioReiniciarFormComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Reiniciar envios à API PGD"
    }
  },
  { 
    path: 'forcar',
    component: EnvioForcarComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Forçar envio",
      modal: true
    }
  },
  { 
    path: 'participantes',
    component: EnvioUsuarioListComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Logs de Participantes",
      modal: false
    }
  },
  { 
    path: 'planos-entrega',
    component: EnvioPlanoEntregaListComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Logs de Planos de Entrega",
      modal: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvioRoutingModule { }

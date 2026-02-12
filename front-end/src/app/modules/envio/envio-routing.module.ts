import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { EnvioUsuarioListComponent } from './envio-usuario-list/envio-usuario-list.component';
import { EnvioPlanoEntregaListComponent } from './envio-plano-entrega-list/envio-plano-entrega-list.component';
import { EnvioPlanoTrabalhoListComponent } from './envio-plano-trabalho-list/envio-plano-trabalho-list.component';

const routes: Routes = [
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
  },
  { 
    path: 'planos-trabalho',
    component: EnvioPlanoTrabalhoListComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Logs de Planos de Trabalho",
      modal: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvioRoutingModule { }

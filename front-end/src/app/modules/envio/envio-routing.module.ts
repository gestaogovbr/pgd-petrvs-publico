import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { EnvioConsultaComponent } from './envio-consulta/envio-consulta.component';

const routes: Routes = [
  {
    path: 'participantes',
    loadChildren: () => import('./envio-participante/routes').then(m => m.routes),
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Logs de Participantes',
      breadcrumb: 'Envio de Participantes',
      modal: false
    }
  },
  {
    path: 'planos-entrega',
    loadChildren: () => import('./envio-plano-entrega/routes').then((m) => m.routes),
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Logs de Planos de Entrega',
      breadcrumb: 'Envio de Planos de Entrega',
      modal: false,
    },
  },
  {
    path: 'planos-trabalho',
    loadChildren: () => import('./envio-plano-trabalho/routes').then((m) => m.routes),
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Logs de Planos de Trabalho',
      breadcrumb: 'Envio de Planos de Trabalho',
      modal: false,
    },
  },
  {
    path: '',
    component: EnvioConsultaComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Consulta de Envios à API PGD',
      modal: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnvioRoutingModule { }

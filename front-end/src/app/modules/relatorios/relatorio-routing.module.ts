import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ConfigResolver } from "src/app/resolvies/config.resolver";
import { RelatorioAgenteComponent } from "./relatorio-agente/relatorio-agente.component";
import { RelatorioPlanoEntregaComponent } from "./relatorio-plano-entrega/relatorio-plano-entrega.component";
import { RelatorioPlanoTrabalhoComponent } from "./relatorio-plano-trabalho/relatorio-plano-trabalho.component";
import { RelatorioPlanoTrabalhoConsultaComponent } from "./relatorio-plano-trabalho-consulta/relatorio-plano-trabalho-consulta.component";
import { RelatorioUnidadeComponent } from "./relatorio-unidade/relatorio-unidade.component";
import { IndicadorEquipeComponent } from "./indicadores-equipes/indicadores-equipes.component";
import { IndicadorGestaoComponent } from "./indicadores-gestao/indicadores-gestao.component";
import { IndicadorEntregaComponent } from "./indicadores-entrega/indicadores-entrega.component";
import { RelatorioCargaIndividualSiapeComponent } from "./relatorio-carga-individual-siape/relatorio-carga-individual-siape.component";

const routes: Routes = [
  {
    path: 'planos-trabalho/cadastrados',
    component: RelatorioPlanoTrabalhoComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Relatório de Planos de Trabalho",
      permission: "MOD_RELATORIO_PT"
    }
  },
  {
    path: 'planos-trabalho/lacunas',
    loadChildren: () => import('./lacuna-plano-trabalho/routes').then((m) => m.routes),
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Lacunas de Planos de Trabalho",
      permission: "MOD_RELATORIO_PT",
      breadcrumb: "Lacunas de Planos de Trabalho",
      modal: false
    }
  },
  {
    path: 'planos-trabalho',
    component: RelatorioPlanoTrabalhoConsultaComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Relatórios de Planos de Trabalho",
      permission: "MOD_RELATORIO_PT"
    }
  },
   { path: 'planos-entrega',
    component: RelatorioPlanoEntregaComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Relatório de Planos de Entrega",
    }
  },
  {
    path: 'entregas',
    loadChildren: () => import('./relatorio-entrega/routes').then((m) => m.routes),
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: 'Entregas',
      breadcrumb: 'Entregas',
      breadcrumbParents: [{ label: 'Relatórios' }],
      permission: 'MOD_RELATORIO_PE',
    },
  }, {
   path: 'agentes',
    component: RelatorioAgenteComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Relatório de Agentes Públicos",
      permission: "MOD_RELATORIO_USUARIO"
    }
  }, {
   path: 'unidades',
    component: RelatorioUnidadeComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Relatório de Unidades",
    }
  }, {
   path: 'carga-individual-siape',
    component: RelatorioCargaIndividualSiapeComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: {
      title: "Relatório de Carga Individual SIAPE",
    }
  }, {
   path: 'indicadores/equipes',
    component: IndicadorEquipeComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Indicadores de Equipe",
    }
  }, {
   path: 'indicadores/gestao',
    component: IndicadorGestaoComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Indicadores de Gestão",
    }
  }, {
   path: 'indicadores/entregas',
    component: IndicadorEntregaComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Indicadores de Entrega",
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ConfigResolver } from "src/app/resolvies/config.resolver";
import { RelatorioAgenteComponent } from "./relatorio-agente/relatorio-agente.component";
import { RelatorioPlanoEntregaComponent } from "./relatorio-plano-entrega/relatorio-plano-entrega.component";
import { RelatorioPlanoTrabalhoComponent } from "./relatorio-plano-trabalho/relatorio-plano-trabalho.component";
import { RelatorioUnidadeComponent } from "./relatorio-unidade/relatorio-unidade.component";

const routes: Routes = [
  { path: 'planos-trabalho',
    component: RelatorioPlanoTrabalhoComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Relatório de Planos de Trabalho",
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
  }, {
   path: 'agentes',
    component: RelatorioAgenteComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Relatório de Agentes Públicos",
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
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }

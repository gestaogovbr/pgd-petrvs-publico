import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ConfigResolver } from "src/app/resolvies/config.resolver";
import { RelatorioPlanoEntregaComponent } from "./relatorio-plano-entrega/relatorio-plano-entrega.component";


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
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }

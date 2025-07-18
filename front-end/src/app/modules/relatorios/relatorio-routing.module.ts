import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ConfigResolver } from "src/app/resolvies/config.resolver";
import { RelatorioAgenteComponent } from "./relatorio-agente/relatorio-agente.component";
//import { PlanoTrabalhoReportComponent } from "./plano-trabalho-report/plano-trabalho-report.component";


const routes: Routes = [
  { 
    /*path: 'planos-trabalho',
    component: PlanoTrabalhoReportComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Relatório de Planos de Trabalho",
    }*/
   path: 'agente',
    component: RelatorioAgenteComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Relatório de Agentes Públicos",
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }

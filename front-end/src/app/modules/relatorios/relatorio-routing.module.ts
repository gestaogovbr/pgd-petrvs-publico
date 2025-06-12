import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ConfigResolver } from "src/app/resolvies/config.resolver";
import { PlanoTrabalhoReportComponent } from "./plano-trabalho-report/plano-trabalho-report.component";


const routes: Routes = [
  { path: 'planos-trabalho',
    component: PlanoTrabalhoReportComponent,
    canActivate: [AuthGuard],
    resolve: { config: ConfigResolver },
    runGuardsAndResolvers: 'always',
    data: { 
      title: "Relatório de Planos de Trabalho",
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }

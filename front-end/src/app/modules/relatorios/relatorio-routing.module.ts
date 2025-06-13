import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ConfigResolver } from "src/app/resolvies/config.resolver";
import { RelatorioPlanoTrabalhoComponent } from "./relatorio-plano-trabalho/relatorio-plano-trabalho.component";


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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }

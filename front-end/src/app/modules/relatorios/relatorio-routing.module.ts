import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ConfigResolver } from 'src/app/resolvies/config.resolver';
import { ForcaDeTrabalhoFilterServidorComponent } from './forca-de-trabalho/filter/servidor/forcadetrabalho-filter-servidor.component';
import { ForcaDeTrabalhoReportServidorComponent } from './forca-de-trabalho/report/servidor/forcadetrabalho-report-servidor.component';
import { ForcaDeTrabalhoFilterAreaComponent } from './forca-de-trabalho/filter/area/forcadetrabalho-filter-area.component';
import { ForcaDeTrabalhoReportAreaComponent } from './forca-de-trabalho/report/area/forcadetrabalho-report-area.component';

const routes: Routes = [
  { path: 'forca-de-trabalho/servidor', component: ForcaDeTrabalhoFilterServidorComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Relatório Individual" } },
  { path: 'forca-de-trabalho/area', component: ForcaDeTrabalhoFilterAreaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Relatório por Área" } },
  { path: 'forca-de-trabalho/report-servidor', component: ForcaDeTrabalhoReportServidorComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Força de Trabalho - Relatório Individual", modal: true } },
  { path: 'forca-de-trabalho/report-area', component: ForcaDeTrabalhoReportAreaComponent, canActivate: [AuthGuard], resolve: { config: ConfigResolver }, runGuardsAndResolvers: 'always', data: { title: "Força de Trabalho - Relatório por Área", modal: true } }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule { }

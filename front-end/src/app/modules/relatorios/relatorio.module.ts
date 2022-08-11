import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandaModule } from './../gestao/demanda/demanda.module';
import { RelatorioRoutingModule } from 'src/app/modules/relatorios/relatorio-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutividadeFilterComponent } from './produtividade/produtividade-filter/produtividade-filter.component';
import { ForcaDeTrabalhoFilterServidorComponent } from './forca-de-trabalho/filter/servidor/forcadetrabalho-filter-servidor.component';
import { ForcaDeTrabalhoFilterAreaComponent } from './forca-de-trabalho/filter/area/forcadetrabalho-filter-area.component';
import { ProdutividadeReportComponent } from './produtividade/produtividade-report/produtividade-report.component';
import { ForcaDeTrabalhoReportServidorComponent } from './forca-de-trabalho/report/servidor/forcadetrabalho-report-servidor.component';
import { ForcaDeTrabalhoReportAreaComponent } from './forca-de-trabalho/report/area/forcadetrabalho-report-area.component';

@NgModule({
  declarations: [
    ProdutividadeFilterComponent,
    ForcaDeTrabalhoFilterServidorComponent,
    ForcaDeTrabalhoFilterAreaComponent,
    ProdutividadeReportComponent,
    ForcaDeTrabalhoReportServidorComponent,
    ForcaDeTrabalhoReportAreaComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RelatorioRoutingModule,
    DemandaModule
  ]
})
export class RelatorioModule { }
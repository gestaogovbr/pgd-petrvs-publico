import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RelatorioAgenteComponent } from './relatorio-agente/relatorio-agente.component';
import { RelatorioUnidadeComponent } from './relatorio-unidade/relatorio-unidade.component';
import { RelatorioPlanoTrabalhoComponent } from './relatorio-plano-trabalho/relatorio-plano-trabalho.component';
import { RelatorioPlanoEntregaComponent } from './relatorio-plano-entrega/relatorio-plano-entrega.component';
import { RelatorioPlanoEntregaHubComponent } from './relatorio-plano-entrega-hub/relatorio-plano-entrega-hub.component';
import { IndicadorEquipeComponent } from './indicadores-equipes/indicadores-equipes.component';
import { IndicadorGestaoComponent } from './indicadores-gestao/indicadores-gestao.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { IndicadorEntregaComponent } from './indicadores-entrega/indicadores-entrega.component';
import { RelatorioCargaIndividualSiapeComponent } from './relatorio-carga-individual-siape/relatorio-carga-individual-siape.component';
import { BreadcrumbComponent } from 'src/app/v2/components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from 'src/app/v2/components/breadcrumb/breadcrumb.service';

@NgModule({
  declarations: [
    RelatorioPlanoTrabalhoComponent,
    RelatorioPlanoEntregaComponent,
    RelatorioPlanoEntregaHubComponent,
    RelatorioAgenteComponent,
    RelatorioUnidadeComponent,
    IndicadorEquipeComponent,
    IndicadorGestaoComponent,
    IndicadorEntregaComponent,
    RelatorioCargaIndividualSiapeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BaseChartDirective,
    BreadcrumbComponent,
    ReactiveFormsModule,
    RelatorioRoutingModule
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
    BreadcrumbService,
  ]
})

export class RelatorioModule { }

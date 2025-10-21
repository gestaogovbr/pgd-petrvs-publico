import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { RelatorioAgenteComponent } from './relatorio-agente/relatorio-agente.component';
import { RelatorioUnidadeComponent } from './relatorio-unidade/relatorio-unidade.component';
import { RelatorioPlanoTrabalhoComponent } from './relatorio-plano-trabalho/relatorio-plano-trabalho.component';
import { RelatorioPlanoEntregaComponent } from './relatorio-plano-entrega/relatorio-plano-entrega.component';
import { IndicadorEquipeComponent } from './indicadores-equipes/indicadores-equipes.component';
import { IndicadorGestaoComponent } from './indicadores-gestao/indicadores-gestao.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@NgModule({
  declarations: [
    RelatorioPlanoTrabalhoComponent,
    RelatorioPlanoEntregaComponent,
    RelatorioAgenteComponent,
    RelatorioUnidadeComponent,
    IndicadorEquipeComponent,
    IndicadorGestaoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    BaseChartDirective,
    ReactiveFormsModule,
    RelatorioRoutingModule
  ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ]
})

export class RelatorioModule { }
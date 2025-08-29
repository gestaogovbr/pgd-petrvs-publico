import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlanoEntregaRoutingModule } from './plano-entrega-routing.module';
import { PlanoEntregaListComponent } from './plano-entrega-list/plano-entrega-list.component';
import { PlanoEntregaFormComponent } from './plano-entrega-form/plano-entrega-form.component';
import { PlanoEntregaListEntregaComponent } from './plano-entrega-list-entrega/plano-entrega-list-entrega.component';
import { PlanoEntregaMapaEntregasComponent } from './plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component';
import { PlanoEntregaFormAdesaoComponent } from './plano-entrega-form-adesao/plano-entrega-form-adesao.component';
import { PlanoEntregaFormEntregaComponent } from './plano-entrega-form-entrega/plano-entrega-form-entrega.component';
import { PlanejamentoModule } from '../planejamento-institucional/planejamento.module';
import { CadeiaValorModule } from '../cadeia-valor/cadeia-valor.module';
import { PlanoEntregaListEntregaListComponent } from './plano-entrega-list-entrega-list/plano-entrega-list-entrega-list.component';
import { PlanoEntregaListLogsComponent } from './plano-entrega-list-logs/plano-entrega-list-logs.component';
import { UteisModule } from '../../uteis/uteis.module';
import { PlanoEntregaValorMetaInputComponent } from './plano-entrega-valor-meta-input/plano-entrega-valor-meta-input.component';
import { PlanoEntregaEntregasPlanoTrabalhoComponent } from './plano-entrega-entregas-plano-trabalho/plano-entrega-entregas-plano-trabalho.component';
import { PlanoTrabalhoEntregaAtividadesComponent } from './plano-trabalho-entrega-atividades/plano-trabalho-entrega-atividades.component';
import { PlanoEntregaListProgressoComponent } from './plano-entrega-list-progresso/plano-entrega-list-progresso.component';
import { PlanoEntregaFormProgressoComponent } from './plano-entrega-form-progresso/plano-entrega-form-progresso.component';
import { PlanoEntregaEntregasVinculadasComponent } from './plano-entrega-entregas-vinculadas/plano-entrega-entregas-vinculadas.component';
import { PlanoEntregaEntregaDetalhesComponent } from './plano-entrega-entrega-detalhes/plano-entrega-entrega-detalhes.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PlanoEntregaListProdutoComponent } from './plano-entrega-list-produto/plano-entrega-list-produto.component';
import { AtividadeModule } from '../atividade/atividade.module';


@NgModule({
  declarations: [
    PlanoEntregaListComponent,
    PlanoEntregaFormComponent,
    PlanoEntregaListEntregaComponent,
    PlanoEntregaFormAdesaoComponent,
    PlanoEntregaMapaEntregasComponent,
    PlanoEntregaMapaEntregasComponent,
    PlanoEntregaFormEntregaComponent,
    PlanoEntregaListEntregaListComponent,
    PlanoEntregaListLogsComponent,
    PlanoEntregaValorMetaInputComponent,
    PlanoEntregaEntregasPlanoTrabalhoComponent,
    PlanoTrabalhoEntregaAtividadesComponent,
    PlanoEntregaListProgressoComponent,
    PlanoEntregaFormProgressoComponent,
    PlanoEntregaEntregasVinculadasComponent,
    PlanoEntregaEntregaDetalhesComponent,
    PlanoEntregaListProdutoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PlanoEntregaRoutingModule,
    PlanejamentoModule,
    CadeiaValorModule,
    OrganizationChartModule,
    UteisModule,
    AtividadeModule
  ]
})
export class PlanoEntregaModule { }

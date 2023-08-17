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
import { PlanoEntregaIndicadorValorComponent } from './plano-entrega-indicador-valor/plano-entrega-indicador-valor.component';

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
    PlanoEntregaIndicadorValorComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PlanoEntregaRoutingModule,
    PlanejamentoModule,
    CadeiaValorModule
  ]
})
export class PlanoEntregaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlanoEntregaRoutingModule } from './plano-entrega-routing.module';

import { PlanoEntregaListComponent } from './plano-entrega-list/plano-entrega-list.component';
import { PlanoEntregaFormComponent } from './plano-entrega-form/plano-entrega-form.component';
import { PlanoEntregaListPontoControleComponent } from './plano-entrega-list-ponto-controle/plano-entrega-list-ponto-controle.component';
import { PlanoEntregaFormPontoControleAvaliarComponent } from './plano-entrega-form-ponto-controle-avaliar/plano-entrega-form-ponto-controle-avaliar.component';
import { PlanoEntregaPontoControleFormEntregaComponent } from './plano-entrega-ponto-controle-form-entrega/plano-entrega-ponto-controle-form-entrega.component';
import { PlanoEntregaListEntregaComponent } from './plano-entrega-list-entrega/plano-entrega-list-entrega.component';
import { PlanoEntregaEntregaFormComponent } from './plano-entrega-entrega-form/plano-entrega-entrega-form.component';
import { PlanoEntregaEntregaListComponent } from './plano-entrega-entrega-list/plano-entrega-entrega-list.component';


@NgModule({
  declarations: [
    PlanoEntregaListComponent,
    PlanoEntregaFormComponent,
    PlanoEntregaListPontoControleComponent,
    PlanoEntregaListEntregaComponent,
    PlanoEntregaFormPontoControleAvaliarComponent,
    PlanoEntregaPontoControleFormEntregaComponent,
    PlanoEntregaEntregaFormComponent,
    PlanoEntregaEntregaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PlanoEntregaRoutingModule
  ]
})
export class PlanoEntregaModule { }

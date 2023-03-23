import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlanoEntregaRoutingModule } from './plano-entrega-routing.module';

import { PlanoEntregaListComponent } from './plano-entrega-list/plano-entrega-list.component';
import { PlanoEntregaFormComponent } from './plano-entrega-form/plano-entrega-form.component';
import { PlanoEntregaListPontoControleComponent } from './plano-entrega-list-ponto-controle/plano-entrega-list-ponto-controle.component';
import { PlanoEntregaFormPontoControleAvaliarComponent } from './plano-entrega-form-ponto-controle-avaliar/plano-entrega-form-ponto-controle-avaliar.component';
import { PlanoEntregaListPontoControleEntregaComponent } from './plano-entrega-list-ponto-controle-entrega/plano-entrega-list-ponto-controle-entrega.component';


@NgModule({
  declarations: [
    PlanoEntregaListComponent,
    PlanoEntregaFormComponent,
    PlanoEntregaListPontoControleComponent,
    PlanoEntregaFormPontoControleAvaliarComponent,
    PlanoEntregaListPontoControleEntregaComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PlanoEntregaRoutingModule
  ]
})
export class PlanoEntregaModule { }

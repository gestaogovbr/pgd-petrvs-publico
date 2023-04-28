import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlanoEntregaRoutingModule } from './plano-entrega-routing.module';
import { PlanoEntregaListComponent } from './plano-entrega-list/plano-entrega-list.component';
import { PlanoEntregaFormComponent } from './plano-entrega-form/plano-entrega-form.component';
import { PlanoEntregaListEntregaComponent } from './plano-entrega-list-entrega/plano-entrega-list-entrega.component';
import { PlanoEntregaEntregaFormComponent } from './plano-entrega-entrega-form/plano-entrega-entrega-form.component';
import { PlanoEntregaEntregaListComponent } from './plano-entrega-entrega-list/plano-entrega-entrega-list.component';
import { PlanoEntregaMapaEntregasComponent } from './plano-entrega-mapa-entregas/plano-entrega-mapa-entregas.component';

@NgModule({
  declarations: [
    PlanoEntregaListComponent,
    PlanoEntregaFormComponent,
    PlanoEntregaListEntregaComponent,
    PlanoEntregaEntregaFormComponent,
    PlanoEntregaEntregaListComponent,
    PlanoEntregaMapaEntregasComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PlanoEntregaRoutingModule
  ]
})
export class PlanoEntregaModule { }

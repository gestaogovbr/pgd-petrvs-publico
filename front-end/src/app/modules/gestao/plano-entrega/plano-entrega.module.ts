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

@NgModule({
  declarations: [
    PlanoEntregaListComponent,
    PlanoEntregaFormComponent,
    PlanoEntregaListEntregaComponent,
    PlanoEntregaFormAdesaoComponent,
    PlanoEntregaMapaEntregasComponent,
    PlanoEntregaMapaEntregasComponent,
    PlanoEntregaFormEntregaComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PlanoEntregaRoutingModule
  ]
})
export class PlanoEntregaModule { }

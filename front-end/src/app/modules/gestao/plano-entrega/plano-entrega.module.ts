import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanoEntregaRoutingModule } from './plano-entrega-routing.module';
import { PlanoEntregaListComponent } from './plano-entrega-list/plano-entrega-list.component';


@NgModule({
  declarations: [
    PlanoEntregaListComponent
  ],
  imports: [
    CommonModule,
    PlanoEntregaRoutingModule
  ]
})
export class PlanoEntregaModule { }

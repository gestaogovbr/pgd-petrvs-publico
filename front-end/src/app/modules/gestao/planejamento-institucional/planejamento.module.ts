import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { PlanejamentoListComponent } from './planejamento-list/planejamento-list.component';
import { PlanejamentoFormComponent } from './planejamento-form/planejamento-form.component';
import { PlanejamentoRoutingModule } from './planejamento-routing.module';
import { PlanejamentoListObjetivoComponent } from './planejamento-list-objetivo/planejamento-list-objetivo.component';
import { PlanejamentoFormObjetivoComponent } from './planejamento-form-objetivo/planejamento-form-objetivo.component';
import { PlanejamentoMapaComponent } from './planejamento-mapa/planejamento-mapa.component';
import { PlanejamentoMapaEntregasComponent } from './planejamento-mapa-entregas/planejamento-mapa-entregas.component';

@NgModule({
  declarations: [
    PlanejamentoListComponent,
    PlanejamentoFormComponent,
    PlanejamentoListObjetivoComponent,
    PlanejamentoFormObjetivoComponent,
    PlanejamentoMapaComponent,
    PlanejamentoMapaEntregasComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PlanejamentoRoutingModule
  ]
})
export class PlanejamentoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { PlanejamentoListComponent } from './planejamento-list/planejamento-list.component';
import { PlanejamentoFormComponent } from './planejamento-form/planejamento-form.component';
import { PlanejamentoRoutingModule } from './planejamento-routing.module';
import { PlanejamentoFormObjetivoComponent } from './planejamento-form-objetivo/planejamento-form-objetivo.component';

@NgModule({
  declarations: [
    PlanejamentoListComponent,
    PlanejamentoFormComponent,
    PlanejamentoFormObjetivoComponent
  ],
  imports: [
    ComponentsModule,
    PlanejamentoRoutingModule,
    CommonModule
  ]
})
export class PlanejamentoModule { }

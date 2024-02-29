import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlanejamentoObjetivoListComponent } from './planejamento-objetivo-list/planejamento-objetivo-list.component';
import { PlanejamentoObjetivoFormComponent } from './planejamento-objetivo-form/planejamento-objetivo-form.component';
import { PlanejamentoObjetivoRoutingModule } from './planejamento-objetivo-routing.module';

@NgModule({
  declarations: [
    PlanejamentoObjetivoFormComponent,
    PlanejamentoObjetivoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    PlanejamentoObjetivoRoutingModule
  ]
})
export class PlanejamentoObjetivoModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListenersRoutingModule } from './listeners-routing.module';
import { ProcedimentoTrabalharComponent } from './procedimento-trabalhar/procedimento-trabalhar.component';
import { ProcedimentoEscolherTipoComponent } from './procedimento-escolher-tipo/procedimento-escolher-tipo.component';
import { EditorMontarComponent } from './editor-montar/editor-montar.component';
import { PetrvsListenerComponent } from './petrvs-listener/petrvs-listener.component';


@NgModule({
  declarations: [
    ProcedimentoTrabalharComponent,
    ProcedimentoEscolherTipoComponent,
    EditorMontarComponent,
    PetrvsListenerComponent
  ],
  imports: [
    CommonModule,
    ListenersRoutingModule
  ]
})
export class ListenersModule { }

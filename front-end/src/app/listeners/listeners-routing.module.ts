import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorMontarComponent } from './editor-montar/editor-montar.component';
import { PetrvsListenerComponent } from './petrvs-listener/petrvs-listener.component';
import { ProcedimentoEscolherTipoComponent } from './procedimento-escolher-tipo/procedimento-escolher-tipo.component';
import { ProcedimentoTrabalharComponent } from './procedimento-trabalhar/procedimento-trabalhar.component';

const routes: Routes = [
  { path: 'editor-montar', component: EditorMontarComponent },
  { path: 'procedimento-trabalhar', component: ProcedimentoTrabalharComponent },
  { path: 'procedimento-escolher-tipo', component: ProcedimentoEscolherTipoComponent },
  { path: 'petrvs', component: PetrvsListenerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListenersRoutingModule { }

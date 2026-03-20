import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtividadeRoutingModule } from './atividade-routing.module';
import { AtividadeListComponent } from './atividade-list/atividade-list.component';
import { AtividadeFormComponent } from './atividade-form/atividade-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AtividadeListGridComponent } from './atividade-list-grid/atividade-list-grid.component';
import { AtividadeFormIniciarComponent } from './atividade-form-iniciar/atividade-form-iniciar.component';
import { AtividadeFormConcluirComponent } from './atividade-form-concluir/atividade-form-concluir.component';
import { AtividadeFormPausarComponent } from './atividade-form-pausar/atividade-form-pausar.component';
import { AtividadeFormProrrogarComponent } from './atividade-form-prorrogar/atividade-form-prorrogar.component';
import { UteisModule } from '../../uteis/uteis.module';
import { AtividadeListKanbanComponent } from './atividade-list-kanban/atividade-list-kanban.component';
import { AtividadeDashboardComponent } from './atividade-dashboard/atividade-dashboard.component';
import { AtividadeFormTarefaComponent } from './atividade-form-tarefa/atividade-form-tarefa.component';
import { AtividadeListTarefaComponent } from './atividade-list-tarefa/atividade-list-tarefa.component';
import { AtividadeHierarquiaComponent } from './atividade-hierarquia/atividade-hierarquia.component';
import { OrganizationChartModule } from 'primeng/organizationchart';


@NgModule({
  declarations: [
    AtividadeListComponent,
    AtividadeFormComponent,
    AtividadeListGridComponent,
    AtividadeFormIniciarComponent,
    AtividadeFormConcluirComponent,
    AtividadeFormPausarComponent,
    AtividadeDashboardComponent,
    AtividadeFormProrrogarComponent,
    AtividadeFormTarefaComponent,
    AtividadeListTarefaComponent,
    AtividadeListKanbanComponent,
    AtividadeHierarquiaComponent
  ],
  imports: [
    CommonModule,
    AtividadeRoutingModule,
    SharedModule,
    UteisModule,
    OrganizationChartModule
  ],
  exports: [
    AtividadeListGridComponent,
    AtividadeListTarefaComponent
  ]
})
export class AtividadeModule { }

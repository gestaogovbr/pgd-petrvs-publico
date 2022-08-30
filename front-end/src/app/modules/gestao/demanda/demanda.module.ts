import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandaRoutingModule } from './demanda-routing.module';
import { DemandaListComponent } from './demanda-list/demanda-list.component';
import { DemandaFormComponent } from './demanda-form/demanda-form.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { DemandaListGridComponent } from './demanda-list-grid/demanda-list-grid.component';
import { DemandaFormIniciarComponent } from './demanda-form-iniciar/demanda-form-iniciar.component';
import { DemandaFormConcluirComponent } from './demanda-form-concluir/demanda-form-concluir.component';
import { DemandaFormAvaliarComponent } from './demanda-form-avaliar/demanda-form-avaliar.component';
import { DemandaFormPausarComponent } from './demanda-form-pausar/demanda-form-pausar.component';
import { DemandaFormProrrogarComponent } from './demanda-form-prorrogar/demanda-form-prorrogar.component';
import { UteisModule } from '../../uteis/uteis.module';
import { DemandaFormEntregaComponent } from './demanda-form-entrega/demanda-form-entrega.component';
import { DemandaListEntregaComponent } from './demanda-list-entrega/demanda-list-entrega.component';
import { DemandaListKanbanComponent } from './demanda-list-kanban/demanda-list-kanban.component';


@NgModule({
  declarations: [
    DemandaListComponent,
    DemandaFormComponent,
    DemandaListGridComponent,
    DemandaFormIniciarComponent,
    DemandaFormConcluirComponent,
    DemandaFormAvaliarComponent,
    DemandaFormPausarComponent,
    DemandaFormProrrogarComponent,
    DemandaFormEntregaComponent,
    DemandaListEntregaComponent,
    DemandaListKanbanComponent
  ],
  imports: [
    CommonModule,
    DemandaRoutingModule,
    ComponentsModule,
    UteisModule
  ],
  exports: [
    DemandaListGridComponent
  ]
})
export class DemandaModule { }

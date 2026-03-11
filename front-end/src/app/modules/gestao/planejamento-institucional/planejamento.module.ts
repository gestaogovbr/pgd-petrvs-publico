import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanejamentoListComponent } from './planejamento-list/planejamento-list.component';
import { PlanejamentoFormComponent } from './planejamento-form/planejamento-form.component';
import { PlanejamentoRoutingModule } from './planejamento-routing.module';
import { PlanejamentoListObjetivoComponent } from './planejamento-list-objetivo/planejamento-list-objetivo.component';
import { PlanejamentoFormObjetivoComponent } from './planejamento-form-objetivo/planejamento-form-objetivo.component';
import { PlanejamentoMapaComponent } from './planejamento-mapa/planejamento-mapa.component';
import { DndModule } from 'ngx-drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlanejamentoListObjetivosEntregasComponent } from './planejamento-list-objetivos-entregas/planejamento-list-objetivos-entregas.component';
import { PlanejamentoOkrComponent } from './planejamento-okr/planejamento-okr.component';
import { UteisModule } from '../../uteis/uteis.module';


@NgModule({
  declarations: [ 
    PlanejamentoListComponent,
    PlanejamentoFormComponent,
    PlanejamentoListObjetivoComponent,
    PlanejamentoFormObjetivoComponent,
    PlanejamentoMapaComponent,
    PlanejamentoListObjetivosEntregasComponent,
    PlanejamentoOkrComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DndModule,
    DragDropModule,
    PlanejamentoRoutingModule,
    UteisModule
  ],
  exports: [
    PlanejamentoListObjetivosEntregasComponent
  ]
})
export class PlanejamentoModule { }

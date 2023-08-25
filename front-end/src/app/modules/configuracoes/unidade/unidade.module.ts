import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadeRoutingModule } from './unidade-routing.module';
import { UnidadeFormComponent } from './unidade-form/unidade-form.component';
import { UnidadeListComponent } from './unidade-list/unidade-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UnidadeMergeComponent } from './unidade-merge/unidade-merge.component';
import { UteisModule } from '../../uteis/uteis.module';
import { UnidadeIntegranteComponent } from './unidade-integrante/unidade-integrante.component';
import { UnidadeListGridComponent } from './unidade-list-grid/unidade-list-grid.component';
import { UnidadeListMapComponent } from './unidade-list-map/unidade-list-map.component';


@NgModule({
  declarations: [
    UnidadeFormComponent,
    UnidadeListComponent,
    UnidadeMergeComponent,
    UnidadeIntegranteComponent,
    UnidadeListGridComponent,
    UnidadeListMapComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UteisModule,
    ReactiveFormsModule,
    UnidadeRoutingModule
  ]
})
export class UnidadeModule { }

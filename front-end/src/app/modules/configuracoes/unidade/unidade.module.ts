import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadeRoutingModule } from './unidade-routing.module';
import { UnidadeFormComponent } from './unidade-form/unidade-form.component';
import { UnidadeListComponent } from './unidade-list/unidade-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UnidadeMergeComponent } from './unidade-merge/unidade-merge.component';
import { UteisModule } from '../../uteis/uteis.module';


@NgModule({
  declarations: [
    UnidadeFormComponent,
    UnidadeListComponent,
    UnidadeMergeComponent
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

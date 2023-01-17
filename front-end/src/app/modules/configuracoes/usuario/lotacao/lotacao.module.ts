import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LotacaoRoutingModule } from './lotacao-routing.module';
import { LotacaoFormComponent } from './lotacao-form/lotacao-form.component';
import { LotacaoListComponent } from './lotacao-list/lotacao-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LotacaoFormComponent,
    LotacaoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    LotacaoRoutingModule
  ]
})
export class LotacaoModule { }

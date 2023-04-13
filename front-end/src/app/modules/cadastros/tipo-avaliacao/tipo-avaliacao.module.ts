import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoAvaliacaoRoutingModule } from './tipo-avaliacao-routing.module';
import { TipoAvaliacaoFormComponent } from './tipo-avaliacao-form/tipo-avaliacao-form.component';
import { TipoAvaliacaoListComponent } from './tipo-avaliacao-list/tipo-avaliacao-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TipoAvaliacaoFormComponent,
    TipoAvaliacaoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    TipoAvaliacaoRoutingModule
  ]
})
export class TipoAvaliacaoModule { }



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoAvaliacaoRoutingModule } from './tipo-avaliacao-routing.module';
import { TipoAvaliacaoFormComponent } from './tipo-avaliacao-form/tipo-avaliacao-form.component';
import { TipoAvaliacaoListComponent } from './tipo-avaliacao-list/tipo-avaliacao-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TipoAvaliacaoFormComponent,
    TipoAvaliacaoListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TipoAvaliacaoRoutingModule
  ]
})
export class TipoAvaliacaoModule { }



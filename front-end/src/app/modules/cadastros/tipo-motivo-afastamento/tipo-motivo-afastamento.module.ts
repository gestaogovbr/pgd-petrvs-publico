import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoMotivoAfastamentoRoutingModule } from './tipo-motivo-afastamento-routing.module';
import { TipoMotivoAfastamentoFormComponent } from './tipo-motivo-afastamento-form/tipo-motivo-afastamento-form.component';
import { TipoMotivoAfastamentoListComponent } from './tipo-motivo-afastamento-list/tipo-motivo-afastamento-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TipoMotivoAfastamentoFormComponent,
    TipoMotivoAfastamentoListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TipoMotivoAfastamentoRoutingModule
  ]
})
export class TipoMotivoAfastamentoModule { }



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoAtividadeRoutingModule } from './tipo-atividade-routing.module';
import { TipoAtividadeFormComponent } from './tipo-atividade-form/tipo-atividade-form.component';
import { TipoAtividadeListComponent } from './tipo-atividade-list/tipo-atividade-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TipoAtividadeFormComponent,
    TipoAtividadeListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    TipoAtividadeRoutingModule
  ]
})
export class TipoAtividadeModule { }

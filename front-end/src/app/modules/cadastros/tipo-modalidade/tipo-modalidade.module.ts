import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoModalidadeRoutingModule } from './tipo-modalidade-routing.module';
import { TipoModalidadeFormComponent } from './tipo-modalidade-form/tipo-modalidade-form.component';
import { TipoModalidadeListComponent } from './tipo-modalidade-list/tipo-modalidade-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TipoModalidadeFormComponent,
    TipoModalidadeListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    TipoModalidadeRoutingModule
  ]
})
export class TipoModalidadeModule { }

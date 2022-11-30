import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregaRoutingModule } from './entrega-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EntregaFormComponent } from './entrega-form/entrega-form.component';
import { EntregaListComponent } from './entrega-list/entrega-list.component';

@NgModule({
  declarations: [
    EntregaFormComponent,
    EntregaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    EntregaRoutingModule
  ]
})
export class EntregaModule { }

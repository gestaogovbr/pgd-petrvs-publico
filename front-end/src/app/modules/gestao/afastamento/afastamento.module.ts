import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfastamentoRoutingModule } from './afastamento-routing.module';
import { AfastamentoFormComponent } from './afastamento-form/afastamento-form.component';
import { AfastamentoListComponent } from './afastamento-list/afastamento-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AfastamentoFormComponent,
    AfastamentoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    AfastamentoRoutingModule
  ]
})
export class AfastamentoModule { }

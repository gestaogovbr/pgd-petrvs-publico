import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoTarefaRoutingModule } from './tipo-tarefa-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoTarefaFormComponent } from './tipo-tarefa-form/tipo-tarefa-form.component';
import { TipoTarefaListComponent } from './tipo-tarefa-list/tipo-tarefa-list.component';


@NgModule({
  declarations: [
    TipoTarefaFormComponent,
    TipoTarefaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    TipoTarefaRoutingModule
  ]
})
export class TipoTarefaModule { }

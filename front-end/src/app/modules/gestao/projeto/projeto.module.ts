import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetoRoutingModule } from './projeto-routing.module';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoPlanejamentoComponent } from './projeto-planejamento/projeto-planejamento.component';


@NgModule({
  declarations: [
    ProjetoListComponent,
    ProjetoFormComponent,
    ProjetoPlanejamentoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ProjetoRoutingModule
  ]
})
export class ProjetoModule { }

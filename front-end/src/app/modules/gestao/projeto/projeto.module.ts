import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetoRoutingModule } from './projeto-routing.module';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProjetoFormComponent } from './projeto-form/projeto-form.component';
import { ProjetoPlanejamentoComponent } from './projeto-planejamento/projeto-planejamento.component';
import { ProjetoFormPrincipalComponent } from './projeto-form-principal/projeto-form-principal.component';
import { ProjetoFormRecursosComponent } from './projeto-form-recursos/projeto-form-recursos.component';
import { ProjetoFormEnvolvidosComponent } from './projeto-form-envolvidos/projeto-form-envolvidos.component';
import { ProjetoFormAlocacoesComponent } from './projeto-form-alocacoes/projeto-form-alocacoes.component';
import { UteisModule } from '../../uteis/uteis.module';


@NgModule({
  declarations: [
    ProjetoListComponent,
    ProjetoFormComponent,
    ProjetoPlanejamentoComponent,
    ProjetoFormPrincipalComponent,
    ProjetoFormRecursosComponent,
    ProjetoFormEnvolvidosComponent,
    ProjetoFormAlocacoesComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UteisModule,
    ProjetoRoutingModule
  ]
})
export class ProjetoModule { }

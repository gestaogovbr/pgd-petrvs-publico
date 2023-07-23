import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioRoutingModule } from 'src/app/modules/relatorios/relatorio-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AtividadeModule } from '../gestao/atividade/atividade.module';

@NgModule({
  declarations: [
    /*ForcaDeTrabalhoFilterServidorComponent,
    ForcaDeTrabalhoFilterAreaComponent,
    ForcaDeTrabalhoReportServidorComponent,
    ForcaDeTrabalhoReportAreaComponent*/
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RelatorioRoutingModule,
    AtividadeModule
  ]
})
export class RelatorioModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { RelatorioPlanoTrabalhoComponent } from './relatorio-plano-trabalho/relatorio-plano-trabalho.component';
import { RelatorioPlanoEntregaComponent } from './relatorio-plano-entrega/relatorio-plano-entrega.component';

@NgModule({
  declarations: [
    RelatorioPlanoTrabalhoComponent,
    RelatorioPlanoEntregaComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RelatorioRoutingModule,
  ]
})

export class RelatorioModule { }
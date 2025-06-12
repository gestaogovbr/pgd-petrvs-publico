import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlanoTrabalhoReportComponent } from './plano-trabalho-report/plano-trabalho-report.component';

@NgModule({
  declarations: [
    PlanoTrabalhoReportComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RelatorioRoutingModule,
  ]
})

export class RelatorioModule { }
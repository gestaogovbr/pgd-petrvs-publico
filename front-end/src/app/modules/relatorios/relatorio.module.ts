import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioRoutingModule } from 'src/app/modules/relatorios/relatorio-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ForcaDeTrabalhoFilterServidorComponent } from './forca-de-trabalho/filter/servidor/forcadetrabalho-filter-servidor.component';
import { ForcaDeTrabalhoFilterAreaComponent } from './forca-de-trabalho/filter/area/forcadetrabalho-filter-area.component';
import { ForcaDeTrabalhoReportServidorComponent } from './forca-de-trabalho/report/servidor/forcadetrabalho-report-servidor.component';
import { ForcaDeTrabalhoReportAreaComponent } from './forca-de-trabalho/report/area/forcadetrabalho-report-area.component';
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
    //RelatorioRoutingModule,
    AtividadeModule
  ]
})
export class RelatorioModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanoTrabalhoRoutingModule } from './plano-trabalho-routing.module';
import { PlanoTrabalhoFormComponent } from './plano-trabalho-form/plano-trabalho-form.component';
import { PlanoTrabalhoListComponent } from './plano-trabalho-list/plano-trabalho-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UteisModule } from '../../uteis/uteis.module';
import { PlanoTrabalhoFormTermoComponent } from './plano-trabalho-form-termo/plano-trabalho-form-termo.component';
import { PlanoTrabalhoListEntregaComponent } from './plano-trabalho-list-entrega/plano-trabalho-list-entrega.component';
import { PlanoTrabalhoConsolidacaoComponent } from './plano-trabalho-consolidacao/plano-trabalho-consolidacao.component';
import { PlanoTrabalhoConsolidacaoListComponent } from './plano-trabalho-consolidacao-list/plano-trabalho-consolidacao-list.component';
import { PlanoTrabalhoListAccordeonComponent } from './plano-trabalho-list-accordeon/plano-trabalho-list-accordeon.component';
import { PlanoTrabalhoConsolidacaoFormComponent } from './plano-trabalho-consolidacao-form/plano-trabalho-consolidacao-form.component';


@NgModule({
  declarations: [
    PlanoTrabalhoFormComponent,
    PlanoTrabalhoListComponent,
    PlanoTrabalhoListEntregaComponent,
    PlanoTrabalhoFormTermoComponent,
    PlanoTrabalhoConsolidacaoComponent,
    PlanoTrabalhoConsolidacaoListComponent,
    PlanoTrabalhoConsolidacaoFormComponent,
    PlanoTrabalhoListAccordeonComponent    
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    PlanoTrabalhoRoutingModule,
    UteisModule
  ]
})
export class PlanoTrabalhoModule { }

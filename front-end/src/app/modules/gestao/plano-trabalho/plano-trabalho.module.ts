import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanoTrabalhoRoutingModule } from './plano-trabalho-routing.module';
import { PlanoTrabalhoFormComponent } from './plano-trabalho-form/plano-trabalho-form.component';
import { PlanoTrabalhoListComponent } from './plano-trabalho-list/plano-trabalho-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UteisModule } from '../../uteis/uteis.module';
import { PlanoTrabalhoTermoAdesaoComponent } from './plano-trabalho-termo-adesao/plano-trabalho-termo-adesao.component';
import { PlanoTrabalhoFormTermoComponent } from './plano-trabalho-form-termo/plano-trabalho-form-termo.component';
import { PlanoTrabalhoListEntregaComponent } from './plano-trabalho-list-entrega/plano-trabalho-list-entrega.component';


@NgModule({
  declarations: [
    PlanoTrabalhoFormComponent,
    PlanoTrabalhoListComponent,
    PlanoTrabalhoListEntregaComponent,
    PlanoTrabalhoTermoAdesaoComponent,
    PlanoTrabalhoFormTermoComponent
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

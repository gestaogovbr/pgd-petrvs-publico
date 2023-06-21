import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanoRoutingModule } from './plano-routing.module';
import { PlanoFormComponent } from './plano-form/plano-form.component';
import { PlanoListComponent } from './plano-list/plano-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UteisModule } from '../../uteis/uteis.module';
import { PlanoTermoAdesaoComponent } from './plano-termo-adesao/plano-termo-adesao.component';
import { PlanoFormTermoComponent } from './plano-form-termo/plano-form-termo.component';
import { PlanoListEntregaComponent } from './plano-list-entrega/plano-list-entrega.component';


@NgModule({
  declarations: [
    PlanoFormComponent,
    PlanoListComponent,
    PlanoListEntregaComponent,
    PlanoTermoAdesaoComponent,
    PlanoFormTermoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    PlanoRoutingModule,
    UteisModule
  ]
})
export class PlanoModule { }

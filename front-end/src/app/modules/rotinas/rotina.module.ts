import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RotinaRoutingModule } from './rotina-routing.module';
import { IntegracaoFormComponent } from './integracao/integracao-form/integracao-form.component';
import { IntegracaoListComponent } from './integracao/integracao-list/integracao-list.component';

@NgModule({
  declarations: [
    IntegracaoFormComponent,
    IntegracaoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    RotinaRoutingModule
  ]
})
export class RotinaModule { }

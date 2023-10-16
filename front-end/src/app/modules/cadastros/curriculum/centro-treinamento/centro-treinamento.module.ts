import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CentroTreinamentoListComponent } from './centro-treinamento-list/centro-treinamento-list.component';
import { CentroTreinamentoFormComponent } from './centro-treinamento-form/centro-treinamento-form.component';
import { CentroTreinamentoRoutingModule } from './centro-treinamento-routing.module';


@NgModule({
  declarations: [
    CentroTreinamentoListComponent,
    CentroTreinamentoFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CentroTreinamentoRoutingModule
    ]  
})
export class CentroTreinamentoModule { }

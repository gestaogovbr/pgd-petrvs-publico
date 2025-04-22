import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultasRoutingModule } from './consultas-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultaCpfSiapeFormComponent } from './consulta-cpf-siape-form/consulta-cpf-siape-form.component';
import { ConsultaUnidadeSiapeFormComponent } from './consulta-unidade-siape-form/consulta-unidade-siape-form.component';
import { ConsultaCpfSiapeResultComponent } from './consulta-cpf-siape-result/consulta-cpf-siape-result.component';


@NgModule({
  declarations: [
    ConsultaCpfSiapeFormComponent,
    ConsultaCpfSiapeResultComponent,
    ConsultaUnidadeSiapeFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    ConsultasRoutingModule
  ]
})
export class ConsultasModule { }

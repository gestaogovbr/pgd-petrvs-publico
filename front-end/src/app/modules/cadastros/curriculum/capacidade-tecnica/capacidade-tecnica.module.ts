import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CapacidadeRoutingModule } from 'src/app/modules/configuracoes/perfil/capacidade/capacidade-routing.module';
import { CapacidadeTecnicaListComponent } from './capacidade-tecnica-list/capacidade-tecnica-list.component';
import { CapacidadeTecnicaFormComponent } from './capacidade-tecnica-form/capacidade-tecnica-form.component';



@NgModule({
  declarations: [
    CapacidadeTecnicaListComponent,
    CapacidadeTecnicaFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CapacidadeRoutingModule
    ]  
})
export class CapacidadeTecnicaModule { }

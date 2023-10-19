import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CapacidadeTecnicaListComponent } from './capacidade-tecnica-list/capacidade-tecnica-list.component';
import { CapacidadeTecnicaFormComponent } from './capacidade-tecnica-form/capacidade-tecnica-form.component';
import { CapacidadeTecnicaRoutingModule } from './capacidade-tecnica-routing.module';



@NgModule({
  declarations: [
    CapacidadeTecnicaListComponent,
    CapacidadeTecnicaFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CapacidadeTecnicaRoutingModule
    ]  
})
export class CapacidadeTecnicaModule { }

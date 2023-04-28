import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { DndModule } from 'ngx-drag-drop';
import { ComponentsModule } from "../../../components/components.module";
import { CadeiaValorRoutingModule } from './cadeia-valor-routing.module';
import { CadeiaValorListComponent } from './cadeia-valor-list/cadeia-valor-list.component';
import { CadeiaValorFormComponent } from './cadeia-valor-form/cadeia-valor-form.component';
import { CadeiaValorListGridComponent } from './cadeia-valor-list-grid/cadeia-valor-list-grid.component';
import { CadeiaValorMapaComponent } from './cadeia-valor-mapa/cadeia-valor-mapa.component';
import { CadeiaValorListProcessosComponent } from './cadeia-valor-list-processos/cadeia-valor-list-processos.component';


@NgModule({
  declarations: [
    CadeiaValorListComponent,
    CadeiaValorFormComponent,
    CadeiaValorListGridComponent,
    CadeiaValorListProcessosComponent,
    CadeiaValorMapaComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    DndModule,
    CadeiaValorRoutingModule
  ]
})
export class CadeiaValorModule { }

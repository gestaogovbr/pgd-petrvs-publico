import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadeiaValorRoutingModule } from './cadeia-valor-routing.module';
import { CadeiaValorListComponent } from './cadeia-valor-list/cadeia-valor-list.component';
import { CadeiaValorFormComponent } from './cadeia-valor-form/cadeia-valor-form.component';
import { CadeiaValorListGridComponent } from './cadeia-valor-list-grid/cadeia-valor-list-grid.component';
import { CadeiaValorListMapComponent } from './cadeia-valor-list-map/cadeia-valor-list-map.component';
import { ComponentsModule } from "../../../components/components.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CadeiaValorFormProcessosComponent } from './cadeia-valor-form-processos/cadeia-valor-form-processos.component';
import { CadeiaValorListProcessoComponent } from './cadeia-valor-list-processo/cadeia-valor-list-processo.component';


@NgModule({
  declarations: [
    CadeiaValorListComponent,
    CadeiaValorFormComponent,
    CadeiaValorListGridComponent,
    CadeiaValorListMapComponent,
    CadeiaValorFormProcessosComponent,
    CadeiaValorListProcessoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CadeiaValorRoutingModule
  ]
})
export class CadeiaValorModule { }

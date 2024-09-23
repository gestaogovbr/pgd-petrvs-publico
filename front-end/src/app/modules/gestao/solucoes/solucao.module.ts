import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolucaoRoutingModule } from './solucao-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { SolucaoFormComponent } from './solucao-form/solucao-form.component';
import { SolucaoListComponent } from './solucao-list/solucao-list.component';
import { SolucaoFiltroComponent } from './solucao-filtro/solucao-filtro.component';

@NgModule({
  declarations: [
    SolucaoFormComponent,
    SolucaoListComponent,
    SolucaoFiltroComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    SolucaoRoutingModule
  ]
})

export class SolucaoModule { }
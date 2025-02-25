import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolucaoRoutingModule } from './solucao-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { SolucaoFormComponent } from './solucao-form/solucao-form.component';
import { SolucaoListComponent } from './solucao-list/solucao-list.component';
import { SolucaoFiltroComponent } from './solucao-filtro/solucao-filtro.component';
import { SolucaoUnidadeComponent } from './solucao-unidade/solucao-unidade.component';
import { SolucaoShowComponent } from './solucao-show/solucao-show.component';

@NgModule({
  declarations: [
    SolucaoFormComponent,
    SolucaoListComponent,
    SolucaoFiltroComponent,
    SolucaoUnidadeComponent,
    SolucaoShowComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    SolucaoRoutingModule,
  ]
})

export class SolucaoModule { }
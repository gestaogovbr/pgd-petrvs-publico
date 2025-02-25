import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ProdutoListProcessoComponent } from './produto-list-processo/produto-list-processo.component';
import { ProdutoListProdutoComponent } from './produto-list-produto/produto-list-produto.component';
import { ProdutoShowComponent } from './produto-show/produto-show.component';
import { ProdutoListClienteComponent } from './produto-list-cliente/produto-list-cliente.component';
import { ProdutoFilterComponent } from './produto-filter/produto-filter.component';
import { ProdutoListSolucaoComponent } from './produto-list-solucao/produto-list-solucao.component';


@NgModule({
  declarations: [
    ProdutoFormComponent,
    ProdutoListComponent,
    ProdutoListProcessoComponent,
    ProdutoListProdutoComponent,
    ProdutoShowComponent,
    ProdutoListClienteComponent,
    ProdutoListSolucaoComponent,
    ProdutoFilterComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    ProdutoRoutingModule
  ]
})

export class ProdutoModule { }
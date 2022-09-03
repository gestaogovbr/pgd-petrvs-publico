import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetoRoutingModule } from './projeto-routing.module';
import { ProjetoListComponent } from './projeto-list/projeto-list.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    ProjetoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ProjetoRoutingModule
  ]
})
export class ProjetoModule { }

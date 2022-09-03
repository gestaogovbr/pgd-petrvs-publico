import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialServicoRoutingModule } from './material-servico-routing.module';
import { MaterialServicoFormComponent } from './material-servico-form/material-servico-form.component';
import { MaterialServicoListComponent } from './material-servico-list/material-servico-list.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    MaterialServicoFormComponent,
    MaterialServicoListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialServicoRoutingModule
  ]
})
export class MaterialServicoModule { }

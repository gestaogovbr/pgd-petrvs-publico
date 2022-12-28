import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadeRoutingModule } from './entidade-routing.module';
import { EntidadeFormComponent } from './entidade-form/entidade-form.component';
import { EntidadeListComponent } from './entidade-list/entidade-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EntidadeConfComponent } from './entidade-conf/entidade-conf.component';
import { UteisModule } from '../../uteis/uteis.module';


@NgModule({
  declarations: [
    EntidadeFormComponent,
    EntidadeListComponent,
    EntidadeConfComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    UteisModule,
    EntidadeRoutingModule
  ]
})
export class EntidadeModule { }

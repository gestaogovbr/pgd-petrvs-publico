import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoClienteFormComponent } from './tipo-cliente-form/tipo-cliente-form.component';
import { TipoClienteListComponent } from './tipo-cliente-list/tipo-cliente-list.component';
import { TipoClienteRoutingModule } from './tipo-cliente-routing.module';


@NgModule({
  declarations: [
    TipoClienteFormComponent,
    TipoClienteListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    TipoClienteRoutingModule
  ]
})
export class TipoClienteModule { }

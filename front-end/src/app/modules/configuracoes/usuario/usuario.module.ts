import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioIntegranteComponent } from './usuario-integrante/usuario-integrante.component';


@NgModule({
  declarations: [
    UsuarioListComponent,
    UsuarioFormComponent,
    UsuarioIntegranteComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }

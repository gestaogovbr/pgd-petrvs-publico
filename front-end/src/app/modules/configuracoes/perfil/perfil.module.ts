import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PerfilListComponent } from './perfil-list/perfil-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PerfilFormComponent,
    PerfilListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GrupoEspecializadoListComponent } from './grupo-especializado-list/grupo-especializado-list.component';
import { GrupoEspecializadoFormComponent } from './grupo-especializado-form/grupo-especializado-form.component';
import { GrupoEspecializadoRoutingModule } from './grupo-especializado-routing.module';

@NgModule({
  declarations: [
    GrupoEspecializadoListComponent,
    GrupoEspecializadoFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    GrupoEspecializadoRoutingModule
    ]  
})
export class GrupoEspecializadoModule { }

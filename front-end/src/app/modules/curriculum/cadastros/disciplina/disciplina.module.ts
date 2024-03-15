import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MateriaFormComponent } from './disciplina-form/disciplina-form.component';
import { MateriaListComponent } from './disciplina-list/materia-list.component';
import { MateriaRoutingModule } from './disciplina-routing.module';



@NgModule({
  declarations: [
    MateriaFormComponent,
    MateriaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    MateriaRoutingModule
  ]
})
export class MateriaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurriculumCadastrosRoutingModule } from './curriculum-cadastros-routing.module';
import { MateriaFormComponent } from './materia/materia-form/materia-form.component';
import { MateriaListComponent } from './materia/materia-list/materia-list.component';


@NgModule({
  declarations: [
    MateriaFormComponent,
    MateriaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CurriculumCadastrosRoutingModule
  ]
})
export class CurriculumCadastrosModule { }

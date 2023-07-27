import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CurriculumRoutingModule } from './curriculum-routing.module';

import { CurriculumFormComponent } from  './curriculum-form/curriculum-form.component'
import { CurriculumProfissionalFormComponent } from  '../curriculum/curriculum-profissional-form/curriculum-profissional-form.component'
import { CurriculumAtributosbig5FormComponent } from './curriculum-atributosbig5-form/curriculum-atributosbig5-form.component';
import { CurriculumListComponent } from '../cadastros/curriculum/curriculum-list/curriculum-list.component';

@NgModule({
  declarations: [
    CurriculumListComponent,
    CurriculumFormComponent,
    CurriculumProfissionalFormComponent,
    CurriculumAtributosbig5FormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CurriculumRoutingModule 
  ]
})
export class CurriculumModule { }

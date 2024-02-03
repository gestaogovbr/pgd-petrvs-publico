import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CurriculumRoutingModule } from './curriculum-routing.module';

import { CurriculumFormComponent } from  './curriculum-form/curriculum-form.component'
import { CurriculumProfissionalFormComponent } from  '../curriculum/curriculum-profissional-form/curriculum-profissional-form.component'
import { CurriculumAtributosbig5FormComponent } from './currriculum-atributos/curriculum-atributosbig5-form/curriculum-atributosbig5-form.component';
import { CurrriculumAtributosComponent } from './currriculum-atributos/currriculum-atributos.component';
import { CurriculumAtributossoftFormComponent } from './currriculum-atributos/curriculum-atributossoft-form/curriculum-atributossoft-form.component';
import { CurriculumAtributosdiscFormComponent } from './currriculum-atributos/curriculum-atributosdisc-form/curriculum-atributosdisc-form.component';
import { CurriculumAtributosDassFormComponent } from './currriculum-atributos/curriculum-atributos-dass-form/curriculum-atributos-dass-form.component';

@NgModule({
  declarations: [
    //CurriculumListComponent,
    CurrriculumAtributosComponent,
    CurriculumFormComponent,
    CurriculumProfissionalFormComponent,
    CurriculumAtributosbig5FormComponent,
    CurriculumAtributossoftFormComponent,
    CurriculumAtributosdiscFormComponent,
    CurriculumAtributosDassFormComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CurriculumRoutingModule 
  ]
})
export class CurriculumModule { }

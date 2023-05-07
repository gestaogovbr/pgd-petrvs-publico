import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CurriculumRoutingModule } from './curriculum-routing.module';

import { RaioxPessoalFormComponent } from  '../curriculum/curriculum-pessoal-form/raiox-pessoal-form.component'
import { CurriculumProfissionalFormComponent } from  '../curriculum/curriculum-profissional-form/curriculum-profissional-form.component'
//import { AreaConhecimentoFormComponent } from '../cadastros/curriculum-cadastros/area-conhecimento-form/area-conhecimento-form.component';
//import { AreaConhecimentoListComponent } from '../cadastros/curriculum-cadastros/area-conhecimento-list/area-conhecimento-list.component';


@NgModule({
  declarations: [
   // AreaConhecimentoFormComponent,
   // AreaConhecimentoListComponent,
    RaioxPessoalFormComponent,
    CurriculumProfissionalFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CurriculumRoutingModule 
  ]
})
export class CurriculumModule { }

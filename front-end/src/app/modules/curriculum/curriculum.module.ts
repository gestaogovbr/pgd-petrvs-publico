import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CurriculumRoutingModule } from './curriculum-routing.module';

import { CurriculumFormComponent } from  './curriculum-form/curriculum-form.component'
import { CurriculumProfissionalFormComponent } from  '../curriculum/curriculum-profissional-form/curriculum-profissional-form.component'

@NgModule({
  declarations: [
 
    CurriculumFormComponent,
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

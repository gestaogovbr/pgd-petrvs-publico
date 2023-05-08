import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CurriculumRoutingModule } from './curriculum-cadastros-routing.module';

import { AreaConhecimentoFormComponent } from './area-conhecimento-form/area-conhecimento-form.component';
import { AreaConhecimentoListComponent } from './area-conhecimento-list/area-conhecimento-list.component';
import { CursoFormComponent } from './curso-form/curso-form.component';
import { CursoListComponent } from './curso-list/curso-list.component';


@NgModule({
  declarations: [
    AreaConhecimentoFormComponent,
    AreaConhecimentoListComponent,
    CursoFormComponent,
    CursoListComponent
  
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CurriculumRoutingModule 
  ]
})
export class CurriculumCadastrosModule { }

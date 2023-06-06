import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CurriculumRoutingModule } from './curriculum-cadastros-routing.module';

import { AreaConhecimentoFormComponent } from './area-conhecimento-form/area-conhecimento-form.component';
import { AreaConhecimentoListComponent } from './area-conhecimento-list/area-conhecimento-list.component';
import { CursoFormComponent } from './curso-form/curso-form.component';
import { CursoListComponent } from './curso-list/curso-list.component';
import { TipoCursoFormComponent } from './tipo-curso-form/tipo-curso-form.component';
import { TipoCursoListComponent } from './tipo-curso-list/tipo-curso-list.component';
import { CentroTreinamentoFormComponent } from './centro-treinamento-form/centro-treinamento-form.component';
import { CentroTreinamentoListComponent } from './centro-treinamento-list/centro-treinamento-list.component';
import { FuncaoFormComponent } from './funcao-form/funcao-form.component';
import { FuncaoListComponent } from './funcao-list/funcao-list.component';
import { GrupoEspecializadoListComponent } from './grupo-especializado-list/grupo-especializado-list.component';
import { GrupoEspecializadoFormComponent } from './grupo-especializado-form/grupo-especializado-form.component';
import { MateriaFormComponent } from './materia-form/materia-form.component';
import { MateriaListComponent } from './materia-list/materia-list.component';
import { CargoFormComponent } from './cargo-form/cargo-form.component';
import { CargoListComponent } from './cargo-list/cargo-list.component';


@NgModule({
  declarations: [
    AreaConhecimentoFormComponent,
    AreaConhecimentoListComponent,
    CursoFormComponent,
    CursoListComponent,
    TipoCursoFormComponent,
    TipoCursoListComponent,
    CentroTreinamentoFormComponent,
    CentroTreinamentoListComponent,
    FuncaoFormComponent,
    FuncaoListComponent,
    GrupoEspecializadoFormComponent,
    GrupoEspecializadoListComponent,
    MateriaFormComponent,
    MateriaListComponent,
    CargoFormComponent,
    CargoListComponent
  
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CurriculumRoutingModule 
  ]
})
export class CurriculumCadastrosModule { }

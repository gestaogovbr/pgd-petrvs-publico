import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurriculumRoutingModule } from './curriculum-cadastros-routing.module';


import { AreaConhecimentoFormComponent } from './area-conhecimento/area-conhecimento-form/area-conhecimento-form.component';
import { AreaConhecimentoListComponent } from './area-conhecimento/area-conhecimento-list/area-conhecimento-list.component';
import { CursoFormComponent } from './curso/curso-form/curso-form.component';
import { CursoListComponent } from './curso/curso-list/curso-list.component';
import { TipoCursoFormComponent } from './tipo-curso/tipo-curso-form/tipo-curso-form.component';
import { TipoCursoListComponent } from './tipo-curso/tipo-curso-list/tipo-curso-list.component';
import { CentroTreinamentoFormComponent } from './centro-treinamento/centro-treinamento-form/centro-treinamento-form.component';
import { CentroTreinamentoListComponent } from './centro-treinamento/centro-treinamento-list/centro-treinamento-list.component';
import { FuncaoFormComponent } from './funcao/funcao-form/funcao-form.component';
import { FuncaoListComponent } from './funcao/funcao-list/funcao-list.component';
import { GrupoEspecializadoListComponent } from './grupo-especializado/grupo-especializado-list/grupo-especializado-list.component';
import { GrupoEspecializadoFormComponent } from './grupo-especializado/grupo-especializado-form/grupo-especializado-form.component';
import { MateriaFormComponent } from './materia/materia-form/materia-form.component';
import { MateriaListComponent } from './materia/materia-list/materia-list.component';
import { CargoFormComponent } from './cargo/cargo-form/cargo-form.component';
import { CargoListComponent } from './cargo/cargo-list/cargo-list.component';
//import { AreaAtividadeExternaFormComponent } from './area-atividade-externa/area-atividade-externa-form/area-atividade-externa-form.component';
//import { AreaAtividadeExternaListComponent } from './area-atividade-externa/area-atividade-externa-list/area-atividade-externa-list.component';
import { AreaTematicaFormComponent } from './area-tematica/area-tematica-form/area-tematica-form.component';
import { AreaTematicaListComponent } from './area-tematica/area-tematica-list/area-tematica-list.component';
import { CapacidadeTecnicaFormComponent } from './capacidade-tecnica/capacidade-tecnica-form/capacidade-tecnica-form.component';
import { CapacidadeTecnicaListComponent } from './capacidade-tecnica/capacidade-tecnica-list/capacidade-tecnica-list.component';
import { QuestionarioPerguntaFormComponent } from './questionario/questionario-pergunta/questionario-pergunta-form/questionario-pergunta-form.component';
import { QuestionarioPerguntaListComponent } from './questionario/questionario-pergunta/questionario-pergunta-list/questionario-pergunta-list.component';
import { QuestionarioRespostaFormComponent } from './questionario/questionario-resposta/questionario-resposta-form/questionario-resposta-form.component';
import { QuestionarioRespostaListComponent } from './questionario/questionario-resposta/questionario-resposta-list/questionario-resposta-list.component';


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
    CargoListComponent,
    //AreaAtividadeExternaFormComponent,
    //AreaAtividadeExternaListComponent,
    AreaTematicaFormComponent,
    AreaTematicaListComponent,
    CapacidadeTecnicaFormComponent,
    CapacidadeTecnicaListComponent,
    QuestionarioPerguntaFormComponent,
    QuestionarioPerguntaListComponent,
    QuestionarioRespostaFormComponent,
    QuestionarioRespostaListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CurriculumRoutingModule
  ]
})
export class CurriculumCadastrosModule { }

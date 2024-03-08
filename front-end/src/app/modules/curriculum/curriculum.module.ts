import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumFormComponent } from  './curriculum-form/curriculum-form.component'
import { CurriculumProfissionalFormComponent } from  '../curriculum/curriculum-profissional-form/curriculum-profissional-form.component'
import { CurriculumAtributosComponent } from './curriculum-atributos/curriculum-atributos.component';
import { CurriculumPesquisaListComponent } from './curriculum-pesquisa-list/curriculum-pesquisa-list.component';
import { CurriculumPerguntaCardComponent } from './curriculum-atributos/curriculum-pergunta-card/curriculum-pergunta-card.component';
import { CurriculumPesquisaListUsuarioComponent } from './curriculum-pesquisa-list-usuario/curriculum-pesquisa-list-usuario.component';
import { CurriculumAtributosSoftFormComponent } from './curriculum-atributos/curriculum-atributos-soft-form/curriculum-atributos-soft-form.component';
import { CurriculumAtributosBig5FormComponent } from './curriculum-atributos/curriculum-atributos-big5-form/curriculum-atributos-big5-form.component';
import { CurriculumAtributosDiscFormComponent } from './curriculum-atributos/curriculum-atributos-disc-form/curriculum-atributos-disc-form.component';
import { CurriculumAtributosDassFormComponent } from './curriculum-atributos/curriculum-atributos-dass-form/curriculum-atributos-dass-form.component';
import { CurriculumAtributosQvtFormComponent } from './curriculum-atributos/curriculum-atributos-qvt-form/curriculum-atributos-qvt-form.component';

@NgModule({
  declarations: [
    CurriculumAtributosComponent,
    CurriculumFormComponent,
    CurriculumProfissionalFormComponent,
    CurriculumAtributosBig5FormComponent,
    CurriculumAtributosSoftFormComponent,
    CurriculumAtributosDiscFormComponent,
    CurriculumAtributosDassFormComponent,
    CurriculumAtributosQvtFormComponent,
    CurriculumPesquisaListComponent,
    CurriculumPerguntaCardComponent,
    CurriculumPesquisaListUsuarioComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    CurriculumRoutingModule 
  ]
})
export class CurriculumModule { }

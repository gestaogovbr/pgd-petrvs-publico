import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionarioListComponent } from './questionario-pergunta/questionario-list/questionario-list.component';
import { QuestionarioFormComponent } from './questionario-pergunta/questionario-form/questionario-form.component';
import { QuestionarioRespostaListComponent } from './questionario-resposta/questionario-resposta-list/questionario-resposta-list.component';
import { QuestionarioRespostaFormComponent } from './questionario-resposta/questionario-resposta-form/questionario-resposta-form.component';
import { QuestionarioListPerguntaComponent } from './questionario-list-pergunta/questionario-list-pergunta.component';
import { QuestionarioRoutingModule } from './questionario-routing.module';

@NgModule({
  declarations: [
    QuestionarioListPerguntaComponent,
    QuestionarioListComponent,
    QuestionarioFormComponent,
    QuestionarioRespostaListComponent,
    QuestionarioRespostaFormComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    QuestionarioRoutingModule
    ]  
})
export class QuestionarioModule { }

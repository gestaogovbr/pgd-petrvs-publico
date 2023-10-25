import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionarioPerguntaListComponent } from './questionario-pergunta/questionario-pergunta-list/questionario-pergunta-list.component';
import { QuestionarioPerguntaFormComponent } from './questionario-pergunta/questionario-pergunta-form/questionario-pergunta-form.component';
import { QuestionarioRespostaListComponent } from './questionario-resposta/questionario-resposta-list/questionario-resposta-list.component';
import { QuestionarioRespostaFormComponent } from './questionario-resposta/questionario-resposta-form/questionario-resposta-form.component';
import { QuestionarioRoutingModule } from './questionario-routing.module';



@NgModule({
  declarations: [
    QuestionarioPerguntaListComponent,
    QuestionarioPerguntaFormComponent,
    QuestionarioRespostaListComponent,
    QuestionarioRespostaFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    QuestionarioRoutingModule
    ]  
})
export class QuestionarioModule { }

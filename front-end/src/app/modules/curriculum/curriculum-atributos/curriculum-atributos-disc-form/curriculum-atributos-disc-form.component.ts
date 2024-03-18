import { Component, Injector, ViewChild } from '@angular/core';
import { PageFormBase } from '../../../base/page-form-base';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { Questionario } from 'src/app/models/questionario.model';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IIndexable } from 'src/app/models/base.model';
import { QuestionarioPerguntaDaoService } from 'src/app/dao/questionario-pergunta-dao.service';
import { QuestionarioPreenchimento } from 'src/app/models/questionario-preenchimento.model';
import { QuestionarioPerguntaResposta } from 'src/app/models/questionario-pergunta-resposta.model';
import { QuestionarioPreenchimentoDaoService } from 'src/app/dao/questionario-preenchimento-dao.service';

@Component({
  selector: 'curriculum-atributos-disc-form',
  templateUrl: './curriculum-atributos-disc-form.component.html',
  styleUrls: ['./curriculum-atributos-disc-form.component.scss']
})
export class CurriculumAtributosDiscFormComponent extends PageFormBase<QuestionarioPreenchimento, QuestionarioPreenchimentoDaoService>{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  bigicoIMG: string;
  bigicoAmareloIMG: string;

  public questionarioDao: QuestionarioDaoService;
  public questionarioPerguntasDao: QuestionarioPerguntaDaoService;
  public questionario?: Questionario;
  public respostas: QuestionarioPerguntaResposta[] = [];

  constructor(public injector: Injector) {
    super(injector, QuestionarioPreenchimento, QuestionarioPreenchimentoDaoService);
    this.join = ['questionario_resposta_pergunta'];
    this.questionarioDao = injector.get<QuestionarioDaoService>(QuestionarioDaoService);
    this.questionarioPerguntasDao = injector.get<QuestionarioPerguntaDaoService>(QuestionarioPerguntaDaoService);

    this.bigicoAmareloIMG = "/assets/images/icon_big_amarelo.png";
    this.bigicoIMG = "/assets/images/icon_big.png";

    this.form = this.fh.FormBuilder({
      comunica: { default: 0 },
      lideranca: { default: 0 },
      resolucao: { default: 0 },
      criatividade: { default: 0 },
      pensamento: { default: 0 },
      habilidade: { default: 0 },
      adaptabilidade: { default: 0 },
      etica: { default: 0 }
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public async loadData(entity: QuestionarioPreenchimento, form: FormGroup) { }

  public async initializeData(form: FormGroup) {
    const questionario = await this.questionarioDao?.query({ where: [['codigo', '==', 'SOFTSKILLS']], join: ['perguntas'] }).asPromise();
    if (questionario?.length) {
      questionario[0].perguntas = questionario[0].perguntas.sort((a, b) => a.sequencia! < b.sequencia! ? -1 : 1);
      this.questionario = questionario[0];
      const questionarioResposta = await this.dao?.query({ where: [['questionario_id', '==', this.questionario.id], ['usuario_id', '==', this.auth.usuario?.id]], join: ['questionario_resposta_pergunta'] }).asPromise();
      this.entity = questionarioResposta?.length ? questionarioResposta[0] : undefined;
      let respostas: any = [];
      if (this.entity) {
        this.questionario.perguntas.forEach((pergunta, index) => {
          this.entity!.respostas?.forEach((resposta, index) => {
            if (pergunta.id == resposta.questionario_pergunta_id) respostas.push(resposta.resposta);
          });
        });
        this.form!.controls.comunica.setValue(respostas[0]);
        this.form!.controls.lideranca.setValue(respostas[1]);
        this.form!.controls.resolucao.setValue(respostas[2]);
        this.form!.controls.criatividade.setValue(respostas[3]);
        this.form!.controls.pensamento.setValue(respostas[4]);
        this.form!.controls.habilidade.setValue(respostas[5]);
        this.form!.controls.adaptabilidade.setValue(respostas[6]);
        this.form!.controls.etica.setValue(respostas[7]);
      }
    } else {
      this.dialog.alert("Teste Soft-Skills não localizado", "Teste não localizado");
    }
    await this.loadData(this.entity!, form);
  }

  public async saveData(form: IIndexable): Promise<QuestionarioPreenchimento | boolean> {
    console.log('curriculum-atributosdisc-form')
    return false;
  }

  public valorSoftChange(control: any) {
    control.value == '' ? control.setValue(0) : '';
    const comunica = this.form?.controls.comunica.value;
    const lideranca = this.form?.controls.lideranca.value;
    const resolucao = this.form?.controls.resolucao.value;
    const criatividade = this.form?.controls.criatividade.value;
    const pensamento = this.form?.controls.pensamento.value;
    const habilidade = this.form?.controls.habilidade.value;
    const adaptabilidade = this.form?.controls.adaptabilidade.value;
    const etica = this.form?.controls.etica.value;
    const array = [comunica, lideranca, resolucao, criatividade, pensamento, habilidade, adaptabilidade, etica]
    let soma: number = 0;
    for (const val of array) {
      soma = soma + parseInt(val);
      if (soma > 20) {
        this.dialog.alert("Valor excedido", "O valor máximo são 20 pontos.");
        control.setValue(control.value - (soma - 20));
        break;
      }
    }
  }
}
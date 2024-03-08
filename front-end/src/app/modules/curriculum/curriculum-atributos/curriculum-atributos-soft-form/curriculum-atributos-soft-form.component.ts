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
  selector: 'curriculum-atributos-soft-form',
  templateUrl: './curriculum-atributos-soft-form.component.html',
  styleUrls: ['./curriculum-atributos-soft-form.component.scss']
})

export class CurriculumAtributosSoftFormComponent extends PageFormBase<QuestionarioPreenchimento, QuestionarioPreenchimentoDaoService>{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  bigicoIMG: string;
  bigicoAmareloIMG: string;

  public questionarioDao: QuestionarioDaoService;
  public questionarioPerguntasDao: QuestionarioPerguntaDaoService;
  public questionario?: Questionario;
  public respostas: QuestionarioPerguntaResposta[] = [];
  public restante: number;

  constructor(public injector: Injector) {
    super(injector, QuestionarioPreenchimento, QuestionarioPreenchimentoDaoService);
    this.join = ['questionario_resposta_pergunta'];
    this.questionarioDao = injector.get<QuestionarioDaoService>(QuestionarioDaoService);
    this.questionarioPerguntasDao = injector.get<QuestionarioPerguntaDaoService>(QuestionarioPerguntaDaoService);
    this.bigicoAmareloIMG = "/assets/images/icon_big_amarelo.png";
    this.bigicoIMG = "/assets/images/icon_big.png";
    this.restante = 20;
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
    const questionario = await this.questionarioDao?.query({ where: [['codigo', '==', 'SOFTSKILL']], join: ['perguntas'] }).asPromise();
    if (questionario?.length) {
      questionario[0].perguntas = questionario[0].perguntas.sort((a, b) => a.sequencia! < b.sequencia! ? -1 : 1);
      this.questionario = questionario[0];
      const questionarioPreenchimento = await this.dao?.query({ where: [['questionario_id', '==', this.questionario.id], ['usuario_id', '==', this.auth.usuario?.id]], join: ['questionario_resposta_pergunta'] }).asPromise();
      if (questionarioPreenchimento?.length) {
        let questionarioRespostaOrdenado: QuestionarioPerguntaResposta[] = [];
        let respostas: any = [];
        let indice = 0;
        this.questionario!.perguntas.forEach(pergunta => {
          questionarioPreenchimento![0].respostas?.forEach((resposta, i) => {
            if (pergunta.id == resposta.questionario_pergunta_id) {
              respostas.push(resposta.resposta);
              indice = i;
            }
          });
          questionarioRespostaOrdenado.push(questionarioPreenchimento![0].respostas![indice]);
        });
        questionarioPreenchimento![0].respostas = questionarioRespostaOrdenado;
        this.entity = questionarioPreenchimento[0];
        this.form!.controls.comunica.setValue(respostas[0]);
        this.form!.controls.lideranca.setValue(respostas[1]);
        this.form!.controls.resolucao.setValue(respostas[2]);
        this.form!.controls.criatividade.setValue(respostas[3]);
        this.form!.controls.pensamento.setValue(respostas[4]);
        this.form!.controls.habilidade.setValue(respostas[5]);
        this.form!.controls.adaptabilidade.setValue(respostas[6]);
        this.form!.controls.etica.setValue(respostas[7]);
        this.restante = 20 - respostas.reduce((soma: any, a: any) => soma + a, 0);
      } else {
        this.entity = undefined;
      }
    }
    await this.loadData(this.entity!, form);
  }

  public async saveData(form: IIndexable): Promise<QuestionarioPreenchimento | boolean> {
    if (!this.questionario) return false;
    let questionarioPreenchimento = this.util.fill(new QuestionarioPreenchimento(), this.entity || {});
    questionarioPreenchimento.usuario_id = this.auth.usuario?.id;
    questionarioPreenchimento.editavel = 1;
    questionarioPreenchimento.questionario_id = this.questionario!.id;
    const valores = [
      this.form!.controls.comunica.value,
      this.form!.controls.lideranca.value,
      this.form!.controls.resolucao.value,
      this.form!.controls.criatividade.value,
      this.form!.controls.pensamento.value,
      this.form!.controls.habilidade.value,
      this.form!.controls.adaptabilidade.value,
      this.form!.controls.etica.value
    ];
    let respostas = this.entity?.respostas || valores.map((x, i) => new QuestionarioPerguntaResposta({
      questionario_pergunta_id: this.questionario!.perguntas[i].id,
      resposta: parseInt(x),
      _status: "ADD"
    }));
    respostas.forEach((x, i) => {
      if ((x._status != "ADD") && (parseInt(x.resposta) != parseInt(valores[i]))) {
        x.resposta = parseInt(valores[i]);
        x._status = "EDIT";
      }
    });
    questionarioPreenchimento.questionario_resposta_pergunta = respostas;
    return questionarioPreenchimento;
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
      this.restante = 20 - soma;
      if (soma > 20) {
        this.dialog.alert("Valor excedido", "O valor máximo são 20 pontos.");
        control.setValue(control.value - (soma - 20));
        break;
      }
    }
  }
}   

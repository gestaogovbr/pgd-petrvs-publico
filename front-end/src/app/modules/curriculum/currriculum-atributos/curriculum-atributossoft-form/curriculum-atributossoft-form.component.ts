import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { PageFormBase } from '../../../base/page-form-base';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { Questionario } from 'src/app/models/questionario.model';
import { QuestionarioDaoService } from 'src/app/dao/questionario-dao.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IIndexable } from 'src/app/models/base.model';
import { QuestionarioPerguntaDaoService } from 'src/app/dao/questionario-pergunta-dao.service';
import { QuestionarioResposta } from 'src/app/models/questionario-resposta.model';
import { QuestionarioRespostaPergunta } from 'src/app/models/questionario-resposta-pergunta.model';
import { QuestionarioRespostaDaoService } from 'src/app/dao/questionario-resposta-dao.service';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'curriculum-atributossoft-form',
  templateUrl: './curriculum-atributossoft-form.component.html',
  styleUrls: ['./curriculum-atributossoft-form.component.scss']
})

export class CurriculumAtributossoftFormComponent extends PageFormBase<QuestionarioResposta, QuestionarioRespostaDaoService>{
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  bigicoIMG: string;
  bigicoAmareloIMG: string;

  public questionarioDao: QuestionarioDaoService;
  public questionarioPerguntasDao: QuestionarioPerguntaDaoService;
  public questionario?: Questionario;
  public respostas: QuestionarioRespostaPergunta[] = [];
  //public formSoftSkills: FormGroup;

  constructor(public injector: Injector) {
    super(injector, QuestionarioResposta, QuestionarioRespostaDaoService);
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

  public async loadData(entity: QuestionarioResposta, form: FormGroup) {}

  public async initializeData(form: FormGroup) {
    const questionario = await this.questionarioDao?.query({ where: [['codigo', '==', 'SOFTSKILL']], join: ['perguntas'] }).asPromise();
    if (questionario?.length) {
      questionario[0].perguntas = questionario[0].perguntas.sort((a, b) => a.sequencia! < b.sequencia! ? -1 : 1);
      this.questionario = questionario[0];
      const questionarioResposta = await this.dao?.query({ where: [['questionario_id', '==', this.questionario.id], ['usuario_id', '==', this.auth.usuario?.id]], join: ['questionario_resposta_pergunta'] }).asPromise();
      this.entity = questionarioResposta?.length ? questionarioResposta[0] : undefined;
      let respostas: any = [];
      if (this.entity) {
        this.questionario.perguntas.forEach((pergunta, index) => {
          this.entity!.questionario_resposta_pergunta.forEach((resposta, index) => {
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

  public async saveData(form: IIndexable): Promise<QuestionarioResposta | boolean> {
    if (!this.questionario) return false;
    let questionarioResposta = this.util.fill(new QuestionarioResposta(), this.entity || {});
    questionarioResposta.usuario_id = this.auth.usuario?.id;
    questionarioResposta.editavel = 1;
    questionarioResposta.questionario_id = this.questionario!.id;
    //questionarioResposta.data_resposta = new Date();;
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

    let respostas = this.entity?.questionario_resposta_pergunta || valores.map((x, i) => new QuestionarioRespostaPergunta({
      questionario_pergunta_id: this.questionario!.perguntas[i].id,
      resposta: parseInt(x),
      _status : "ADD"
    }));
    respostas.forEach((x, i) => {
      if ((x._status != "ADD") && (parseInt(x.resposta) != parseInt(valores[i]))){
        x.resposta = parseInt(valores[i]);
        x._status = "EDIT";
      }
    });
    questionarioResposta.questionario_resposta_pergunta = respostas;
    return questionarioResposta;
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
      //console.log('SUM SEQUENCIA', sum)
      soma = soma + parseInt(val);

      if (soma > 20) {
        this.dialog.alert("Valor excedido", "O valor máximo são 20 pontos.");
        control.setValue(control.value - (soma - 20));
        break;
      }
    }
  }


}

